import urllib.request
import json
import os
import yaml
import re

# Output directory for Next.js data files
OUTPUT_DIR = "src/data/scriptures"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Function to parse frontmatter from markdown content
def parse_markdown_verse(content):
    # Regex to split frontmatter from markdown body
    match = re.match(r"^---\s*\n(.*?)\n---\s*\n(.*)$", content, re.DOTALL)
    if not match:
        # Try YAML-only content
        try:
            return yaml.safe_load(content.strip("---")), ""
        except Exception:
            return {}, content
    
    frontmatter_raw = match.group(1)
    body = match.group(2)
    
    try:
        data = yaml.safe_load(frontmatter_raw)
        return data, body
    except Exception as e:
        print(f"Error parsing YAML frontmatter: {e}")
        return {}, content

# Generic function to fetch and compile a list of files from raw URL structure
def compile_scripture(name, base_url, filenames):
    print(f"\nCompiling {name}...")
    compiled_verses = []
    
    for fname in filenames:
        url = f"{base_url}/{fname}"
        print(f"  Fetching {fname}...")
        headers = {"User-Agent": "Mozilla/5.0"}
        req = urllib.request.Request(url, headers=headers)
        
        try:
            with urllib.request.urlopen(req) as response:
                content = response.read().decode('utf-8')
                data, body = parse_markdown_verse(content)
                if data:
                    # Basic verse schema consolidation
                    verse_id = fname.replace(".md", "")
                    
                    # Formatting values to avoid raw multi-line strings with odd spacing
                    formatted_verse = {
                        "id": verse_id,
                        "verse_number": data.get("verse_number"),
                        "title_en": data.get("title_en", ""),
                        "title_hi": data.get("title_hi", ""),
                        "devanagari": clean_spacing(data.get("devanagari", "")),
                        "transliteration": clean_spacing(data.get("transliteration", "")),
                        "word_meanings": data.get("word_meanings", []),
                        "literal_translation": data.get("literal_translation", {}),
                        "interpretive_meaning": data.get("interpretive_meaning", {}),
                        "story": data.get("story", {}),
                        "practical_application": data.get("practical_application", {}),
                        "puranic_context": data.get("puranic_context", [])
                    }
                    compiled_verses.append(formatted_verse)
                else:
                    print(f"    Failed to parse frontmatter from {fname}")
        except Exception as e:
            print(f"    Error fetching {fname}: {e}")
            
    # Write to target JSON
    output_path = os.path.join(OUTPUT_DIR, f"{name}.json")
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(compiled_verses, f, ensure_ascii=False, indent=2)
    print(f"Successfully compiled {name} -> {output_path} (Total verses: {len(compiled_verses)})")

def clean_spacing(text):
    if not text:
        return ""
    # Standardize spaces and lines
    lines = [line.strip() for line in text.split("\n")]
    return "\n".join([line for line in lines if line])

def main():
    # 1. Compile Hanuman Chalisa
    chalisa_base = "https://raw.githubusercontent.com/sanatan-learnings/hanuman-gpt/main/_verses/hanuman-chalisa"
    chalisa_files = ["doha-01.md", "doha-02.md"] + [f"chaupai-{i:02d}.md" for i in range(1, 41)] + ["doha-closing.md"]
    compile_scripture("hanuman-chalisa", chalisa_base, chalisa_files)
    
    # 2. Compile Bajrang Baan
    baan_base = "https://raw.githubusercontent.com/sanatan-learnings/hanuman-gpt/main/_verses/bajrang-baan"
    baan_files = ["doha-opening.md"] + [f"chaupai-{i:02d}.md" for i in range(1, 58)] + ["doha-closing.md"]
    compile_scripture("bajrang-baan", baan_base, baan_files)
    
    # 3. Compile Sankat Mochan Hanumanashtak
    ashtak_base = "https://raw.githubusercontent.com/sanatan-learnings/hanuman-gpt/main/_verses/sankat-mochan-hanumanashtak"
    ashtak_files = [f"pada-{i:02d}.md" for i in range(1, 9)]
    compile_scripture("sankat-mochan-hanumanashtak", ashtak_base, ashtak_files)

if __name__ == "__main__":
    main()
