import fs from 'fs';
import path from 'path';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO = 'BoozeLee/c-h-OODOOOOORRRR';
const BRANCH = 'main';

interface FileToUpload {
  path: string;
  content: string;
}

async function uploadFile(filePath: string, content: string) {
  const url = `https://api.github.com/repos/${REPO}/contents/${filePath}`;
  
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: `Add ${filePath}`,
      content: Buffer.from(content).toString('base64'),
      branch: BRANCH
    })
  });

  if (response.ok) {
    console.log(`✅ ${filePath}`);
    return true;
  } else {
    const error = await response.json();
    console.log(`❌ ${filePath}: ${error.message}`);
    return false;
  }
}

async function getAllFiles(dir: string, baseDir: string = dir): Promise<FileToUpload[]> {
  const files: FileToUpload[] = [];
  const skip = ['.git', 'node_modules', '.cache', '.local', 'dist'];
  
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    if (skip.includes(item) || item.startsWith('.')) continue;
    
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...await getAllFiles(fullPath, baseDir));
    } else {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const relativePath = path.relative(baseDir, fullPath);
      files.push({ path: relativePath, content });
    }
  }
  
  return files;
}

async function main() {
  console.log('🚀 Uploading to GitHub...\n');
  
  const workspace = '/home/runner/workspace';
  const files = await getAllFiles(workspace);
  
  console.log(`📦 Found ${files.length} files\n`);
  
  let uploaded = 0;
  
  for (const file of files) {
    if (await uploadFile(file.path, file.content)) {
      uploaded++;
    }
    await new Promise(r => setTimeout(r, 1000));
  }
  
  console.log(`\n✅ Done! ${uploaded}/${files.length} files uploaded`);
  console.log(`🔗 https://github.com/${REPO}`);
}

main().catch(console.error);
