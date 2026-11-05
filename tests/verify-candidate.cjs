'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'), file=path.join(root,'index.html'), html=fs.readFileSync(file,'utf8');
const scripts=[...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)];
assert.equal(scripts.length,11);
for(const [i,m] of scripts.entries()){assert(!/\bsrc\s*=/i.test(m[1]));new vm.Script(m[2],{filename:'inline-'+i+'.js'});}
for(const pattern of [/\bfetch\s*\(/,/XMLHttpRequest/,/WebSocket/,/sendBeacon/,/postMessage/,/window\.parent/,/serviceWorker/,/AudioContext/,/decodeAudioData/,/GameTheorySamples/,/GameTheoryScore/,/@base44/,/data:audio/,/data:image\/(?:png|webp|jpe?g|gif)/])assert(!pattern.test(html),'forbidden candidate pattern: '+pattern);
assert(!/<(?:script|iframe|object|embed|audio|video)\b[^>]*(?:src|data)\s*=/i.test(html));
assert(!/<link\b[^>]*href=["'](?:https?:)?\/\//i.test(html));
assert(!/@import|url\(\s*["']?(?:https?:)?\/\//i.test(html));
assert(html.includes("connect-src 'none'")&&html.includes("form-action 'none'")&&html.includes("img-src data:"));
assert(html.includes('Community edition.')&&html.includes('three computer-controlled characters'));
const assets=[...html.matchAll(/data:image\/svg\+xml;base64,([A-Za-z0-9+/=]+)/g)];
assert.equal(assets.length,93); // 92 replacement bitmaps plus favicon.
for(const m of assets){const svg=Buffer.from(m[1],'base64').toString();assert(svg.startsWith('<svg '));assert(!/<(?:image|script|foreignObject)\b/i.test(svg));assert(!/\b(?:href|src)\s*=/i.test(svg));}
const storageKeys=[...html.matchAll(/(?:getItem|setItem|removeItem)\(["']([^"']+)["']/g)].map(m=>m[1]);
assert(storageKeys.length>0);for(const key of storageKeys)assert(key.startsWith('gametheory-community:'),'unscoped storage: '+key);
assert(html.includes("const key = 'gametheory-community:gametheory-avatar-choice-v2'"));
assert(!/localStorage\.clear\s*\(/.test(html));
const audio=vm.createContext({window:{}});vm.runInContext(scripts[2][2],audio,{timeout:1000});
for(const k of ['unlock','setEnabled','ensureAudio','stopAmbient','startAmbient','duckAmbient','playKeyTap','startTypingTicks','stopTypingTicks','playTone','setMix','info'])assert.equal(typeof audio.window.TeamplayAudio[k],'function');
assert.equal(audio.window.TeamplayAudio.info().samples,0);assert.equal(audio.window.TeamplayAudio.info().enabled,false);assert.equal(audio.window.TeamplayAudio.info().playing,false);assert.equal(audio.window.TeamplayAudio.ensureAudio(),null);
const about=fs.readFileSync(path.join(root,'what-is-game-theory.html'),'utf8');assert(!/<script|<iframe|<img|https?:\/\//i.test(about));assert(about.includes('href="index.html"'));
assert(fs.existsSync(path.join(root,'LICENSE')));assert(!fs.existsSync(path.join(root,'package.json')));assert(!fs.existsSync(path.join(root,'base44')));
console.log(JSON.stringify({passed:true,inlineScriptsParsed:scripts.length,svgPlaceholders:assets.length,scopedStorageOperations:storageKeys.length,audio:'silent',networkChecks:'static only',browserTests:'not run'}));
