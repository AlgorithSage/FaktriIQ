import os
import sys
from fastapi import FastAPI, HTTPException
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
        "indexed_clauses": len(knowledge_base.documents)
    }

@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "guidelines_loaded": len(knowledge_base.documents) > 0
    }

@app.post("/ask", response_model=AskResponse)
def ask_copilot(request: AskRequest):
    query = request.query.strip()
    if not query:
        raise HTTPException(status_code=400, detail="Query string cannot be empty")
    
    print(f"[API Request] Query received: '{query}'")
    result = query_faktriiq_agent(query)
    return result

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
