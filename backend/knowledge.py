import os
import json
import re
import time
from typing import List, Dict, Any
from rank_bm25 import BM25Okapi

GUIDELINES_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "guidelines.json")

EQUIPMENT_KEYWORDS = [
    "valve", "pump", "tank", "vessel", "boiler", "compressor", "pipeline",
    "vent", "gas detector", "extinguisher", "ppe", "scaffold", "crane",
    "forklift", "electrical panel", "transformer", "generator", "motor",
    "conveyor", "chimney", "flare", "pressure gauge", "relief valve",
    "confined space", "ladder", "harness", "respirator", "hydrant",
]

CLAUSE_REF_PATTERN = re.compile(
    r"\b(?:Section|Sec\.?|Chapter|CHAPTER)\s+[\w()\d-]+"
    r"|\b(?:Factories Act\s*\d*|DGMS(?:[\-\w]*)?|OISD[\-\w]*|PESO[\-\w]*|MSIHC[\-\w]*)\b",
    re.IGNORECASE,
)

DATE_PATTERN = re.compile(
    r"\b\d{1,2}[-/](?:\d{1,2}|[A-Za-z]{3})[-/]\d{2,4}\b"
)

HEADING_PATTERN = re.compile(r"^\s*((?:CHAPTER|Section|SECTION)\s+[\w\d]+|\d+(?:\.\d+)*\.?)\s+\S", re.MULTILINE)

class StatutoryKnowledgeBase:
    """
    Ingests and indexes the 9 statutory safety guidelines JSON files
    (Factories Act, OISD, PESO, DGMS Coal/Metal/Oil/Electrical/OSH, MSIHC).
    Provides ultra-fast BM25 + Keyword search for RAG context retrieval.
    """
    def __init__(self, guidelines_dir: str = GUIDELINES_DIR):
        self.guidelines_dir = guidelines_dir
        self.documents: List[Dict[str, Any]] = []
        self.corpus_tokens: List[List[str]] = []
        self.bm25: BM25Okapi = None
        self._load_and_index()

    def _tokenize(self, text: str) -> List[str]:
        text = text.lower()
        tokens = re.findall(r'\b\w+\b', text)
        return tokens

    def _load_and_index(self):
        if not os.path.exists(self.guidelines_dir):
            print(f"[KnowledgeBase] Warning: Guidelines directory not found at {self.guidelines_dir}")
            return

        json_files = [f for f in os.listdir(self.guidelines_dir) if f.endswith(".json")]
        print(f"[KnowledgeBase] Ingesting {len(json_files)} statutory guideline files...")

        for file_name in json_files:
            file_path = os.path.join(self.guidelines_dir, file_name)
            try:
                with open(file_path, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    if isinstance(data, list):
                        for item in data:
                            source = item.get("source_framework", file_name.replace(".json", ""))
                            clause_id = item.get("clause_id", "General")
                            header_path = item.get("header_path", [])
                            text = item.get("text", "")
                            equipment_keywords = item.get("equipment_keywords", [])

                            if not text or len(text.strip()) < 10:
                                continue

                            doc_obj = {
                                "source_framework": source,
                                "clause_id": clause_id,
                                "header_path": header_path,
                                "text": text,
                                "equipment_keywords": equipment_keywords,
                                "file_name": file_name
                            }

                            # Indexable text string combining header, tags, and text content
                            header_str = " > ".join(header_path) if header_path else ""
                            keywords_str = " ".join(equipment_keywords)
                            searchable_text = f"{source} {clause_id} {header_str} {keywords_str} {text}"

                            self.documents.append(doc_obj)
                            self.corpus_tokens.append(self._tokenize(searchable_text))
            except Exception as e:
                print(f"[KnowledgeBase] Error reading {file_name}: {e}")

        if self.corpus_tokens:
            self.bm25 = BM25Okapi(self.corpus_tokens)
            print(f"[KnowledgeBase] Indexing complete! Loaded {len(self.documents)} total clauses.")

    def search(self, query: str, top_k: int = 5) -> List[Dict[str, Any]]:
        """Searches the statutory index and returns the top matching clauses."""
        if not self.bm25 or not self.documents:
            return []

        query_tokens = self._tokenize(query)
        scores = self.bm25.get_scores(query_tokens)
        
        # Sort indices by score descending
        top_indices = sorted(range(len(scores)), key=lambda i: scores[i], reverse=True)[:top_k]
        
        results = []
        for idx in top_indices:
            if scores[idx] > 0.1:  # Relevance threshold
                results.append(self.documents[idx])

        return results

    def format_context_for_prompt(self, query: str, top_k: int = 5) -> str:
        """Formats top search results into a clean markdown context string for LLM RAG."""
        results = self.search(query, top_k=top_k)
        if not results:
            return "No specific statutory guidelines found in the dataset for this query."

        context_blocks = []
        for idx, doc in enumerate(results, 1):
            header = " > ".join(doc["header_path"]) if doc["header_path"] else doc["clause_id"]
            keywords = ", ".join(doc["equipment_keywords"]) if doc["equipment_keywords"] else "N/A"
            block = (
                f"--- STATUTORY CLAUSE [{idx}] ---\n"
                f"Source: {doc['source_framework']}\n"
                f"Clause/Header: {header}\n"
                f"Equipment Keywords: {keywords}\n"
                f"Mandate Text:\n{doc['text']}\n"
            )
            context_blocks.append(block)

        return "\n".join(context_blocks)

    def add_documents(self, new_docs: List[Dict[str, Any]]) -> None:
        """Appends documents to the live index and rebuilds BM25 over the full corpus."""
        for doc_obj in new_docs:
            header_str = " > ".join(doc_obj["header_path"]) if doc_obj["header_path"] else ""
            keywords_str = " ".join(doc_obj["equipment_keywords"])
            searchable_text = f"{doc_obj['source_framework']} {doc_obj['clause_id']} {header_str} {keywords_str} {doc_obj['text']}"
            self.documents.append(doc_obj)
            self.corpus_tokens.append(self._tokenize(searchable_text))
        self.bm25 = BM25Okapi(self.corpus_tokens)

    def _chunk_pdf_text(self, full_text: str) -> List[str]:
        """Splits raw extracted PDF text into clause-sized chunks."""
        headings = list(HEADING_PATTERN.finditer(full_text))
        chunks: List[str] = []

        if len(headings) >= 3:
            # Enough structure to split by detected headings.
            for i, match in enumerate(headings):
                start = match.start()
                end = headings[i + 1].start() if i + 1 < len(headings) else len(full_text)
                chunk = full_text[start:end].strip()
                if chunk:
                    chunks.append(chunk)
        else:
            # No reliable heading structure -> split on blank lines, merging
            # short fragments (page numbers, running headers) into neighbors.
            paragraphs = [p.strip() for p in re.split(r"\n\s*\n", full_text) if p.strip()]
            buffer = ""
            for para in paragraphs:
                buffer = f"{buffer} {para}".strip() if buffer else para
                if len(buffer) >= 300:
                    chunks.append(buffer)
                    buffer = ""
            if buffer:
                chunks.append(buffer)

        # Cap oversized chunks so BM25/LLM context stays reasonable.
        capped: List[str] = []
        for chunk in chunks:
            if len(chunk) <= 1500:
                capped.append(chunk)
            else:
                for i in range(0, len(chunk), 1500):
                    capped.append(chunk[i:i + 1500])
        return capped

    def _persist_ingested_documents(self, doc_id: str, new_docs: List[Dict[str, Any]]) -> None:
        """Writes newly ingested clauses to their own file in guidelines_dir so
        they're picked up automatically on the next server restart."""
        os.makedirs(self.guidelines_dir, exist_ok=True)
        out_path = os.path.join(self.guidelines_dir, f"ingested_{doc_id}.json")
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(new_docs, f, ensure_ascii=False, indent=2)

    def ingest_pdf_bytes(self, filename: str, pdf_bytes: bytes) -> Dict[str, Any]:
        """Extracts text from an uploaded PDF, chunks + tags it, adds it to the
        live BM25 index, and persists it so it survives a server restart."""
        import fitz  # PyMuPDF — imported lazily so import cost is paid only when ingesting

        doc = fitz.open(stream=pdf_bytes, filetype="pdf")
        full_text = "\n\n".join(page.get_text() for page in doc)
        doc.close()

        chunks = self._chunk_pdf_text(full_text)
        if not chunks:
            raise ValueError("No extractable text found in this PDF (it may be a scanned image without OCR).")

        doc_id = f"SOP-{int(time.time())}"
        source_framework = os.path.splitext(filename)[0]

        all_equipment_tags: set = set()
        all_clause_refs: set = set()
        all_dates: set = set()
        new_docs: List[Dict[str, Any]] = []

        for chunk in chunks:
            lower_chunk = chunk.lower()
            equipment_keywords = [kw for kw in EQUIPMENT_KEYWORDS if kw in lower_chunk]
            clause_refs = sorted(set(m.group(0) for m in CLAUSE_REF_PATTERN.finditer(chunk)))
            dates = sorted(set(m.group(0) for m in DATE_PATTERN.finditer(chunk)))

            heading_match = HEADING_PATTERN.match(chunk)
            clause_id = heading_match.group(1) if heading_match else "General"

            all_equipment_tags.update(equipment_keywords)
            all_clause_refs.update(clause_refs)
            all_dates.update(dates)

            new_docs.append({
                "source_framework": source_framework,
                "clause_id": clause_id,
                "header_path": [clause_id] if clause_id != "General" else [],
                "text": chunk,
                "equipment_keywords": equipment_keywords,
                "file_name": filename,
                "doc_id": doc_id,
            })

        self.add_documents(new_docs)
        self._persist_ingested_documents(doc_id, new_docs)

        return {
            "doc_id": doc_id,
            "filename": filename,
            "chunks_indexed": len(new_docs),
            "equipment_tags": sorted(all_equipment_tags),
            "clause_refs": sorted(all_clause_refs),
            "dates": sorted(all_dates),
        }


# Singleton instance
knowledge_base = StatutoryKnowledgeBase()
