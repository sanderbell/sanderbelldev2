import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve, extname} from 'node:path';
const root = resolve('dist');
const types = {'.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.webmanifest': 'application/manifest+json'};
createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  let path = decodeURIComponent(url.pathname);
  if (path.endsWith('/')) path += 'index.html';
  if (path === '/hui/login') path = '/hui/login.html';
  const file = resolve(root, '.' + path);
  if (!file.startsWith(root + '/')) { res.writeHead(403).end(); return; }
  try {
    const body = await readFile(file);
    res.writeHead(200, {'Content-Type': types[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store'}).end(body);
  } catch { res.writeHead(404).end(); }
}).listen(4175, '127.0.0.1');
