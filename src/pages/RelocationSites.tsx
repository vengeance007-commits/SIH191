import { useState } from "react";
import { Search } from "lucide-react";
import { relocationSites } from "../data/mockData";
import RelocationSiteCard from "../components/relocation/RelocationSiteCard";
import SiteSuitability from "../components/relocation/SiteSuitability";
import CapacityIndicator from "../components/relocation/CapacityIndicator";
export default function RelocationSites(){
 const [q,setQ]=useState(""); const [selected,setSelected]=useState<typeof relocationSites[number]|null>(null);
 const filtered=relocationSites.filter(s=>s.name.toLowerCase().includes(q.toLowerCase()));
 const best=[...relocationSites].sort((a,b)=>b.suitabilityScore-a.suitabilityScore)[0];
 return <div style={{minHeight:"100vh",background:"#f1f5f9",padding:24}}><h1>Safe Relocation Sites</h1><p style={{color:"#64748b"}}>Evaluate safer alternative locations using safety, capacity, accessibility, facilities and distance.</p>
 <div style={{position:"relative",maxWidth:500,margin:"18px 0"}}><Search size={17} style={{position:"absolute",left:12,top:12}}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search relocation site..." style={{width:"100%",height:42,padding:"0 12px 0 38px",border:"1px solid #cbd5e1",borderRadius:9}}/></div>
 <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:14}}>{filtered.map(s=><RelocationSiteCard key={s.id} site={s} recommended={s.id===best.id} onSelect={()=>setSelected(s)}/>)}</div>
 {selected&&<div style={{marginTop:16,display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:14}}><SiteSuitability site={selected}/><CapacityIndicator population={Math.round(selected.capacity*.5)} capacity={selected.capacity}/></div>}
 </div>
}
