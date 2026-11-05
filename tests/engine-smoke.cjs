'use strict';
const fs=require('node:fs'), vm=require('node:vm'), assert=require('node:assert/strict');
const path=process.argv[2]||require('node:path').join(__dirname,'../index.html');
function loadEngine(path){
const html=fs.readFileSync(path,'utf8');
const blocks=[...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)].map(m=>m[1]);
const context=vm.createContext({window:{}});
for(const b of blocks.filter(b=>b.includes('window.TeamplayContent =')||b.includes('window.TeamplayEngine ='))) vm.runInContext(b,context,{timeout:5000});
return context.window.TeamplayEngine;
}
const baseline=loadEngine(path);
let comparisons=0;
const normalize=v=>JSON.parse(JSON.stringify(v,(k,v)=>typeof v==='string'&&/^\d{4}-\d\d-\d\dT\d\d:/.test(v)?'[timestamp]':v));
const candidate=process.argv[3]?loadEngine(process.argv[3]):null;
const E=candidate?new Proxy(baseline,{get(target,key){const value=target[key];if(typeof value!=='function')return value;return (...args)=>{const a=value(...args),b=candidate[key](...args);assert.deepEqual(normalize(a),normalize(b),'candidate mismatch: '+key);comparisons++;return a;};}}):baseline;
const P=Array.from(E.PEOPLE), games=['shoal','collection','city','signal','envelope','constellation','lantern'];
const sum=o=>Object.values(o).reduce((a,b)=>a+b,0); let rounds=0;
function check(s,g){
 const rows=s[g].history; assert(rows.length>0); const r=rows.at(-1); rounds++;
 if(g==='shoal'){assert(s.shoal.stock>=0&&s.shoal.stock<=100);assert.equal(r.total,sum(r.takes));assert.equal(r.remaining,Math.max(0,(rows.length===1?100:rows.at(-2).stock)-r.stockPressure));}
 if(g==='collection'){assert.equal(sum(Object.fromEntries(P.map(p=>[p,s.collection.holdings[p].length]))),rows.length); for(const p of P){assert(s.collection.coins[p]>=0);assert.equal(s.collection.coins[p]+s.collection.spent[p],p==='you'?(E.conditionFor(s,g)==='advantage'?150:E.conditionFor(s,g)==='disadvantage'?50:100):100);}}
 if(g==='city'){assert(s.city.health>=0&&s.city.health<=10);assert.equal(r.accepted,Object.values(r.votes).filter(Boolean).length>=3);assert.equal(sum(r.applied),r.accepted?20:12);}
 if(g==='signal'){for(const p of P)assert.equal(r.gains[p],r.allHunt?6:r.choices[p]==='alone'?2:0);}
 if(g==='envelope'){assert.equal(sum(r.final),sum(s.envelope.start)+2*sum(r.sends));for(const p of P)assert(r.returns[p]>=0&&r.returns[p]<=r.arrived[p]);}
 if(g==='constellation'){assert.equal(r.anchorCount+r.beaconCount+r.nebulaCount,4);assert.equal(r.delta,r.anchorCount+(r.beaconCount>=2?r.beaconCount*4:0)+(r.nebulaCount===1?9:0)-(r.nebulaCount>=2?2:0));assert(s.constellation.score>=0);}
 if(g==='lantern'){assert.equal(r.selected.length,3);assert.equal(new Set(r.selected).size,3);assert.equal(r.success,r.selected.every(p=>r.choices[p]==='contribute'));}
}
for(let seed=1;seed<=60;seed++)for(const g of games){
 let s=E.startGame(E.fresh(String(seed)),g),n=0;
 while(!s[g].ended){assert(n++<15,`${g} termination`);const before=JSON.stringify(s);
 let next;
 if(g==='shoal')next=E.resolveShoal(s,seed%16);
 if(g==='collection')next=E.resolveAuction(s,(seed%3)*1000);
 if(g==='city'){if(!s.city.proposal){s=E.submitCityProposal(s,{you:5,nia:5,bram:5,tolu:5});} next=E.resolveCityVote(s,Boolean(seed%2));}
 if(g==='signal')next=E.resolveSignal(s,seed%2?'hunt':'alone');
 if(g==='envelope')next=E.resolveEnvelopeReturn(E.submitEnvelopeSend(s,seed%21),seed%50);
 if(g==='constellation')next=E.resolveConstellation(s,['anchor','beacon','nebula'][seed%3]);
 if(g==='lantern'){next=E.resolveLanternNight(s,seed%2?'contribute':'withhold');if(!next.lantern.ended)next=E.resolveLanternVote(next,E.NPCS[seed%3]);}
 if(g!=='city')assert.equal(JSON.stringify(s),before,'input mutation '+g);
 s=next;check(s,g);if(s.punishment)s=E.continueAfterPunishment(s);
 }
 assert.equal(s.completed.filter(x=>x===g).length,1);assert(s[g].history.length<10);
}
console.log(JSON.stringify({passed:true,sessions:60*games.length,equivalenceComparisons:comparisons,roundChecks:rounds,games}));
