import os
import sys
import json
from dotenv import load_dotenv

# Ensure backend directory is in python path
sys.path.append(os.path.dirname(__file__))

from knowledge import knowledge_base
from groq import Groq

# Load .env file from backend directory
env_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path=env_path)

groq_api_key = os.getenv("GROQ_API_KEY")
if not groq_api_key:
    raise ValueError("GROQ_API_KEY environment variable not found. Please set it in backend/.env")

# Initialize Groq Client
client = Groq(api_key=groq_api_key)

SYSTEM_PROMPT = """You are FaktriIQ Copilot — an expert AI Industrial Safety Compliance Officer.
Your primary role is to assist factory technicians, engineers, and plant safety officers with clear, authoritative compliance answers based on Indian statutory industrial safety rules (Factories Act 1948, OISD, PESO, DGMS, MSIHC).

FORMATTING RULES FOR YOUR RESPONSE (CRITICAL FOR MOBILE READABILITY):
1. Never write dense, unformatted walls of text or markdown tables.
2. Structure your response into 3-4 distinct sections using bold emoji headers:
   📌 **EXECUTIVE SUMMARY** (1 short, direct sentence answering the question)
   📜 **STATUTORY MANDATE** (Specific Act/Rule citations with **exact numbers, limits, and frequencies** in bold)
   📋 **TECHNICIAN ACTION CHECKLIST** (Bulleted step-by-step checklist using clear • bullet points)
   ⚠️ **SAFETY WARNING / THRESHOLD** (Critical safety boundaries in bold)

3. Use **bold** for all key safety parameters (e.g. **2.5 bar**, **7.0 kg/cm²**, **19.5% O2**, **Annually**, **Sec 36(1)**).
4. Use *italics* for equipment tags, definitions, or operational notes.
5. Keep paragraphs short (maximum 2-3 lines).
"""

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

        answer_text = completion.choices[0].message.content

        return {
            "success": True,
            "query": query,
            "answer": answer_text,
            "source": primary_source,
            "section": primary_section,
            "confidence": "High Confidence (Groq 120B)",
            "full_section_text": f"Retrieved Context:\n{full_text}" if full_text else None
        }

    except Exception as e:
        print(f"[Agent Error] {e}")
        # Fallback to direct statutory text if API call fails
        if top_docs:
            doc = top_docs[0]
            return {
                "success": True,
                "query": query,
                "answer": f"Statutory Match ({doc['source_framework']} - {doc['clause_id']}):\n{doc['text']}",
                "source": doc['source_framework'],
                "section": doc['clause_id'],
                "confidence": "Direct Statutory Citation",
                "full_section_text": doc['text']
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
