import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {runInNewContext} from 'node:vm';

const manifest=JSON.parse(await readFile('public/hui/manifest.webmanifest','utf8'));
assert.equal(manifest.id,'/hui/');assert.equal(manifest.start_url,'/hui/');assert.equal(manifest.scope,'/hui/');assert.equal(manifest.display,'standalone');
for(const icon of manifest.icons){
 const image=await readFile('public'+icon.src);
 const [width,height]=icon.sizes.split('x').map(Number);
 assert.equal(image.readUInt32BE(16),width);assert.equal(image.readUInt32BE(20),height);
}
for(const file of ['index.html','login.html']){
 const html=await readFile('public/hui/'+file,'utf8');
 assert.match(html,/rel="manifest"[^>]*crossorigin="use-credentials"/);
 assert.match(html,/apple-touch-icon/);assert.match(html,/name="robots" content="noindex/);
}
assert.doesNotMatch(await readFile('src/hui-login.ts','utf8'),/[А-Яа-я]/);

const listeners={};let mode='online';const deleted=[];const requests=[];
const mock={
 self:{location:{origin:'https://sanderbell.dev'},addEventListener:(event,callback)=>listeners[event]=callback,skipWaiting:async()=>{},clients:{claim:async()=>{}}},
 caches:{keys:async()=>['huihui-pwa-old','unrelated-app'],delete:async key=>deleted.push(key)},
 fetch:async(request,options)=>{requests.push({request,options});if(mode==='offline')throw new Error('Offline');return new Response(mode==='expired'?'Unauthorized':'PRIVATE TEST CONTENT',{status:mode==='expired'?401:200});},
 URL,Response,
};
runInNewContext(await readFile('public/hui/sw.js','utf8'),mock);
let pending;listeners.activate({waitUntil:value=>pending=value});await pending;
assert.deepEqual(deleted,['huihui-pwa-old']);
const invoke=async(path,{navigate=false,method='GET'}={})=>{
 let result;listeners.fetch({request:{url:'https://sanderbell.dev'+path,mode:navigate?'navigate':'cors',method},respondWith:value=>result=value});return await result;
};
let result=await invoke('/hui/',{navigate:true});assert.equal(await result.text(),'PRIVATE TEST CONTENT');
mode='expired';result=await invoke('/hui/',{navigate:true});assert.equal(result.status,401);assert.equal(await result.text(),'Unauthorized');
mode='offline';result=await invoke('/hui/',{navigate:true});assert.equal(result.status,503);assert.match(await result.text(),/Reconnect/);
result=await invoke('/hui/api/chat',{method:'POST'});assert.equal(result.status,503);assert.doesNotMatch(await result.text(),/PRIVATE TEST CONTENT/);
assert.equal(result.headers.get('cache-control'),'no-store');assert.match(result.headers.get('x-robots-tag'),/noindex/);
assert.equal(await invoke('/'),undefined);
assert.ok(requests.every(({options})=>options.cache==='no-store'));
assert.doesNotMatch(await readFile('public/hui/sw.js','utf8'),/caches\.open|\.put\(|\.addAll\(|\.match\(/);
console.log('PASS: install manifest/icons, English sign-in, offline fallback, expired-session network response and no private PWA cache');
