import os
import json

def search_all_edits():
    brain_dir = r'C:\Users\mlsiv\.gemini\antigravity\brain'
    targets = ['index.html', 'products.html', 'checkout.html']
    
    # We will search all jsonl files in the brain directory
    for root, dirs, files in os.walk(brain_dir):
        # Skip current conversation folder
        if '8b230cec-b599-4261-b0a9-78c663d0c86a' in root:
            continue
            
        for f in files:
            if f.endswith('transcript_full.jsonl'):
                p = os.path.join(root, f)
                try:
                    with open(p, 'r', encoding='utf-8', errors='ignore') as file:
                        for line_num, line in enumerate(file, 1):
                            if any(t in line for t in targets):
                                # Load the json line
                                try:
                                    data = json.loads(line)
                                    # Let's inspect the tool calls
                                    tool_calls = data.get('tool_calls', [])
                                    for tc in tool_calls:
                                        name = tc.get('name', '')
                                        if 'replace_file_content' in name or 'write_to_file' in name or 'multi_replace_file_content' in name:
                                            args = tc.get('arguments', {})
                                            target_file = args.get('TargetFile', '')
                                            
                                            # Check which target matches
                                            matched_target = None
                                            for t in targets:
                                                if t in target_file:
                                                    matched_target = t
                                                    break
                                            
                                            if matched_target:
                                                print(f"MATCH: File: {p} Line: {line_num}")
                                                print(f"  Tool: {name}")
                                                print(f"  TargetFile: {target_file}")
                                                # Print keys in arguments
                                                print(f"  Args keys: {list(args.keys())}")
                                                if 'ReplacementContent' in args:
                                                    rep = args['ReplacementContent']
                                                    print(f"  ReplacementContent size: {len(rep)} chars, snippet: {rep[:100]!r}")
                                                if 'CodeContent' in args:
                                                    code = args['CodeContent']
                                                    print(f"  CodeContent size: {len(code)} chars, snippet: {code[:100]!r}")
                                                print("-" * 50)
                                except Exception:
                                    pass
                except Exception as e:
                    print(f"Error reading {p}: {e}")

if __name__ == '__main__':
    search_all_edits()
