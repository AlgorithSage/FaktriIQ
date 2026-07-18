import os
import json
import re
from typing import List, Dict, Any
from rank_bm25 import BM25Okapi

GUIDELINES_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "guidelines.json")

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


# Singleton instance
knowledge_base = StatutoryKnowledgeBase()
