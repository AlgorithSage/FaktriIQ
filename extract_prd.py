import zipfile
import xml.etree.ElementTree as ET
import os

docx_path = r"c:\Users\USER\Desktop\Master PRD.docx"
output_path = r"c:\Users\USER\Desktop\FaktriIQ\FaktriIQ_Master_PRD.md"

if not os.path.exists(docx_path):
    print(f"Error: {docx_path} does not exist.")
    exit(1)

try:
    with zipfile.ZipFile(docx_path) as docx:
        xml_content = docx.read('word/document.xml')
    
    root = ET.fromstring(xml_content)
    
    # Define namespaces
    ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
    
    paragraphs = []
    for para in root.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
        p_text = []
        for run in para.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t'):
            if run.text:
                p_text.append(run.text)
        paragraphs.append("".join(p_text))
    
    # Write paragraphs as markdown
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write("\n\n".join(paragraphs))
    
    print(f"Successfully extracted PRD text to {output_path}")
    print(f"Character count: {len('\n\n'.join(paragraphs))}")

except Exception as e:
    print(f"Error extracting docx: {e}")
