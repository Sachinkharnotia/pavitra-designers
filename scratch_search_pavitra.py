import os

def search_for_pavitra_backups():
    onedrive_dir = os.path.expandvars('%USERPROFILE%/OneDrive')
    search_term = "navbar-pavitra"
    print(f"Searching for files containing '{search_term}' under {onedrive_dir}...")
    
    # We will walk through the directory
    for root, dirs, files in os.walk(onedrive_dir):
        # Exclude appdata cache, current workspace, and node_modules to speed up
        if any(x in root for x in ['AppData', 'node_modules', '.git', '.cache', 'pavitra 2 (1)']):
            continue
            
        for f in files:
            if f.endswith('.html'):
                p = os.path.join(root, f)
                try:
                    # Check if file has our search term
                    if os.path.getsize(p) > 20000:
                        with open(p, 'r', encoding='utf-8', errors='ignore') as file:
                            content = file.read()
                            if search_term in content:
                                print(f"FOUND BACKUP: {p} (Size: {len(content)} characters)")
                except Exception:
                    pass

if __name__ == '__main__':
    search_for_pavitra_backups()
