#!/usr/bin/env python3
"""
GitHub Upload Automation Script
Uses GitHub API to upload all project files programmatically
"""

import os
import base64
import requests
import json
from pathlib import Path

# Configuration
GITHUB_TOKEN = os.environ.get('GITHUB_TOKEN')
REPO_OWNER = 'BoozeLee'
REPO_NAME = 'c-h-OODOOOOORRRR'
BASE_URL = f'https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}'

# Files to skip
SKIP_PATTERNS = [
    '.git/', 'node_modules/', '.cache/', '.local/', 
    '__pycache__/', '.replit', 'replit.nix',
    '.env', '.env.local'
]

def should_skip(file_path):
    """Check if file should be skipped"""
    for pattern in SKIP_PATTERNS:
        if pattern in str(file_path):
            return True
    return False

def upload_file(file_path, content):
    """Upload a single file to GitHub"""
    headers = {
        'Authorization': f'token {GITHUB_TOKEN}',
        'Accept': 'application/vnd.github.v3+json'
    }
    
    # Encode content
    encoded_content = base64.b64encode(content).decode('utf-8')
    
    # Prepare API request
    url = f'{BASE_URL}/contents/{file_path}'
    data = {
        'message': f'Add {file_path}',
        'content': encoded_content,
        'branch': 'main'
    }
    
    response = requests.put(url, headers=headers, json=data)
    
    if response.status_code in [200, 201]:
        print(f'✅ Uploaded: {file_path}')
        return True
    else:
        print(f'❌ Failed: {file_path} - {response.status_code}')
        print(response.json())
        return False

def main():
    """Main upload function"""
    print(f'🚀 Uploading files to {REPO_OWNER}/{REPO_NAME}...\n')
    
    if not GITHUB_TOKEN:
        print('❌ GITHUB_TOKEN not found in environment')
        return
    
    workspace = Path('/home/runner/workspace')
    uploaded = 0
    failed = 0
    
    # Walk through all files
    for root, dirs, files in os.walk(workspace):
        # Skip hidden directories
        dirs[:] = [d for d in dirs if not d.startswith('.')]
        
        for file in files:
            file_path = Path(root) / file
            relative_path = file_path.relative_to(workspace)
            
            if should_skip(str(relative_path)):
                continue
            
            try:
                with open(file_path, 'rb') as f:
                    content = f.read()
                
                if upload_file(str(relative_path), content):
                    uploaded += 1
                else:
                    failed += 1
                    
            except Exception as e:
                print(f'❌ Error reading {relative_path}: {e}')
                failed += 1
    
    print(f'\n📊 Results:')
    print(f'   ✅ Uploaded: {uploaded}')
    print(f'   ❌ Failed: {failed}')
    print(f'\n🔗 View at: https://github.com/{REPO_OWNER}/{REPO_NAME}')

if __name__ == '__main__':
    main()
