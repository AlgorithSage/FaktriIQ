import os
import sys
import time
from collections import defaultdict
from fastapi import FastAPI, File, HTTPException, UploadFile, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

sys.path.append(os.path.dirname(__file__))

from agent import query_faktriiq_agent
from knowledge import knowledge_base

app = FastAPI(
    title="FaktriIQ Copilot API",
    description="Statutory Industrial Safety RAG API powered by Agno + Groq (openai/gpt-oss-120b)",
    version="1.0.0"
)

# Enable CORS for Flutter app / web clients
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================
# RATE LIMITER (In-Memory Sliding Window)
# ==========================================
class RateLimiter:
    def __init__(self, requests_limit: int, window_seconds: int = 60):
        self.limit = requests_limit
        self.window = window_seconds
        self.requests = defaultdict(list)
        self.last_cleanup = time.time()

    def _cleanup(self, now: float):
        if now - self.last_cleanup > 300:  # Cleanup every 5 minutes
            for ip, timestamps in list(self.requests.items()):
                valid_timestamps = [t for t in timestamps if now - t < self.window]
                if valid_timestamps:
                    self.requests[ip] = valid_timestamps
                else:
                    del self.requests[ip]
            self.last_cleanup = now

    def check_rate_limit(self, request: Request):
        now = time.time()
        self._cleanup(now)

        # Respect X-Forwarded-For header when running behind reverse proxy (Render / Cloudflare)
        forwarded = request.headers.get("X-Forwarded-For")
        client_ip = (
            forwarded.split(",")[0].strip()
            if forwarded
            else (request.client.host if request.client else "unknown")
        )

        timestamps = [t for t in self.requests[client_ip] if now - t < self.window]
        if len(timestamps) >= self.limit:
            oldest = timestamps[0]
            retry_after = int(self.window - (now - oldest)) + 1
            raise HTTPException(
                status_code=429,
                detail=f"Rate limit exceeded ({self.limit} req/min). Please try again in {retry_after} seconds.",
                headers={"Retry-After": str(retry_after)}
            )

        timestamps.append(now)
        self.requests[client_ip] = timestamps


# Configure limiters: 60 queries/min for /ask, 20 uploads/min for /ingest
ask_limiter = RateLimiter(requests_limit=60, window_seconds=60)
ingest_limiter = RateLimiter(requests_limit=20, window_seconds=60)

class AskRequest(BaseModel):
    query: str

class AskResponse(BaseModel):
    success: bool
    query: str
    answer: str
    source: str
    section: str
    confidence: str
    full_section_text: str | None = None

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "FaktriIQ Copilot API",
        "model": "openai/gpt-oss-120b (Groq)",
        "indexed_clauses": len(knowledge_base.documents),
        "rate_limiting": "enabled (60 req/min)"
    }

@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "guidelines_loaded": len(knowledge_base.documents) > 0
    }

@app.post("/ask", response_model=AskResponse)
def ask_copilot(request_data: AskRequest, request: Request):
    ask_limiter.check_rate_limit(request)
    query = request_data.query.strip()
    if not query:
        raise HTTPException(status_code=400, detail="Query string cannot be empty")

    print(f"[API Request] Query received: '{query}'")
    result = query_faktriiq_agent(query)
    return result

@app.post("/ingest")
async def ingest_document(request: Request, file: UploadFile = File(...)):
    ingest_limiter.check_rate_limit(request)
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    pdf_bytes = await file.read()
    if not pdf_bytes:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")

    print(f"[API Request] Ingesting document: '{file.filename}' ({len(pdf_bytes)} bytes)")
    try:
        result = knowledge_base.ingest_pdf_bytes(file.filename, pdf_bytes)
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ingestion failed: {e}")

    return {"success": True, **result}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
