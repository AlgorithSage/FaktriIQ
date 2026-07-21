import os
import sys
import json
from dotenv import load_dotenv

# When frozen (PyInstaller), __file__-relative paths don't point at the
# distributable's layout — resolve against the exe's own directory instead.
if getattr(sys, "frozen", False):
    _BACKEND_DIR = os.path.dirname(sys.executable)
else:
    _BACKEND_DIR = os.path.dirname(__file__)
    sys.path.append(_BACKEND_DIR)

from knowledge import knowledge_base
from groq import Groq

# Load .env file from backend directory
env_path = os.path.join(_BACKEND_DIR, ".env")
load_dotenv(dotenv_path=env_path)

groq_api_key = os.getenv("GROQ_API_KEY")
if not groq_api_key:
    raise ValueError("GROQ_API_KEY environment variable not found. Please set it in backend/.env")

# Initialize Groq Client
client = Groq(api_key=groq_api_key)

SYSTEM_PROMPT = """You are FaktriIQ Copilot — an expert AI Industrial Safety Compliance Officer.
Your primary role is to assist factory technicians, engineers, and plant safety officers with clear, authoritative compliance answers based on Indian statutory industrial safety rules (Factories Act 1948, OISD, PESO, DGMS, MSIHC).

FORMATTING RULES FOR YOUR RESPONSE (CRITICAL FOR READABILITY):
1. Structure your response into 4 distinct sections using clean emoji headers (do NOT put asterisks inside header titles):
   📌 EXECUTIVE SUMMARY
   📜 STATUTORY MANDATE
   📋 TECHNICIAN ACTION CHECKLIST
   ⚠️ SAFETY WARNING / THRESHOLD

2. USE BOLD SUBHEADINGS & BULLET LEAD TITLES UNDER EVERY PART HEADING:
   - Under 📌 EXECUTIVE SUMMARY: Start every bullet point with a **Bold Lead Title** (e.g., • **Primary Operational Risk:** ..., • **Key Compliance Directive:** ...).
   - Under 📜 STATUTORY MANDATE: Start every rule with a **Bold Citation Title** (e.g., • **DGMS Guidelines — Section 111(2):** ..., • **Factories Act 1948 — Section 36(1):** ...).
   - Under 📋 TECHNICIAN ACTION CHECKLIST: Start every step with a **Bold Step Title** (e.g., 1. **Atmospheric Testing:** ..., 2. **Isolate Pipelines:** ...).
   - Under ⚠️ SAFETY WARNING / THRESHOLD: Start every warning with a **Bold Threshold Title** (e.g., • **MAXIMUM PERMISSIBLE LIMIT:** H2S gas must be below **10 PPM**).

3. ALWAYS BOLD ALL NUMERICAL METRICS & SECTION NUMBERS IN DOUBLE ASTERISKS:
   - Wrap all Act names, section numbers, pressure metrics, PPM limits, temperature limits, and inspection frequencies in **double asterisks** (e.g., **Factories Act 1948**, **Section 111(2)**, **OISD-STD-128**, **2.5 bar**, **7.0 kg/cm²**, **1.5 × MOP**, **Annually**).

4. Keep text structured, professional, and visually engaging.
"""

def _clean_header_stars(text: str) -> str:
    lines = text.split('\n')
    cleaned = []
    for line in lines:
        stripped = line.strip()
        if any(stripped.startswith(e) for e in ['📌', '📜', '📋', '⚠️', '###', '#']):
            cleaned.append(stripped.replace('**', '').replace('*', ''))
        else:
            cleaned.append(line)
    return '\n'.join(cleaned)

def query_faktriiq_agent(query: str) -> dict:
    """
    RAG Agent Query Handler:
    1. Retrieves top statutory clauses from BM25 knowledge index.
    2. Formulates prompt with retrieved legal context.
    3. Calls Groq API using model 'openai/gpt-oss-120b'.
    4. Returns structured JSON output for the Flutter app.
    """
    # 1. Retrieve statutory context
    retrieved_context = knowledge_base.format_context_for_prompt(query, top_k=4)
    top_docs = knowledge_base.search(query, top_k=1)
    
    primary_source = top_docs[0]['source_framework'] if top_docs else "FaktriIQ Safety Engine"
    primary_section = top_docs[0]['clause_id'] if top_docs else "General Compliance"
    full_text = top_docs[0]['text'] if top_docs else ""

    # 2. Build LLM prompt
    user_content = f"""STATUTORY CONTEXT:
{retrieved_context}

TECHNICIAN QUESTION:
"{query}"

Please provide a clear, concise, and structured safety answer for the technician based on the statutory context above.
"""

    try:
        completion = client.chat.completions.create(
            model="openai/gpt-oss-120b",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_content}
            ],
            temperature=0.3,
            max_completion_tokens=1024,
            top_p=1,
            reasoning_effort="medium"
        )

        answer_text = _clean_header_stars(completion.choices[0].message.content)

        return {
            "success": True,
            "query": query,
            "answer": answer_text,
            "source": primary_source,
            "section": primary_section,
            "confidence": "High Confidence (Groq 120B)",
            "full_section_text": f"Retrieved Context:\n{full_text.replace('**', '')}" if full_text else None
        }

    except Exception as e:
        print(f"[Agent Error] {e}")
        # Fallback to direct statutory text if API call fails
        if top_docs:
            doc = top_docs[0]
            clean_clause = str(doc['clause_id']).replace('**', '')
            clean_doc_text = str(doc['text']).replace('**', '')
            return {
                "success": True,
                "query": query,
                "answer": f"Statutory Match ({doc['source_framework']} - {clean_clause}):\n{clean_doc_text}",
                "source": doc['source_framework'],
                "section": clean_clause,
                "confidence": "Direct Statutory Citation",
                "full_section_text": clean_doc_text
            }
        else:
            return {
                "success": False,
                "query": query,
                "answer": f"Error querying AI backend: {str(e)}",
                "source": "System Error",
                "section": "N/A",
                "confidence": "Low",
                "full_section_text": None
            }
