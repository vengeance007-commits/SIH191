import { useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import { habitations } from "../data/mockData";
import HabitationDetails from "../components/habitation/HabitationDetails";
export default function Habitations(){
 const [q,setQ]=useState(""); const [selected,setSelected]=useState<typeof habitations[number]|null>(null);
 const filtered=habitations.filter(h=>(h.name+" "+h.location).toLowerCase().includes(q.toLowerCase()));
 return <div style={{minHeight:"100vh",background:"#f1f5f9",padding:24}}><h1>Vulnerable Habitations</h1><p style={{color:"#64748b"}}>Identify and prioritize habitations exposed to multi-hazard risk.</p>
 <div style={{position:"relative",maxWidth:500,margin:"18px 0"}}><Search size={17} style={{position:"absolute",left:12,top:12}}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search habitation or location..." style={{width:"100%",height:42,padding:"0 12px 0 38px",border:"1px solid #cbd5e1",borderRadius:9}}/></div>
 <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",gap:12}}>{filtered.map(h=><button key={h.id} onClick={()=>setSelected(h)} style={{textAlign:"left",background:"#fff",border:"1px solid #e2e8f0",borderRadius:13,padding:16,cursor:"pointer"}}><b>{h.name}</b><div style={{fontSize:12,color:"#64748b"}}>{h.location}</div><div style={{marginTop:12}}>Population: <b>{h.population.toLocaleString()}</b></div><div style={{color:h.riskLevel==="Red"?"#dc2626":h.riskLevel==="High"?"#f97316":"#ca8a04",fontWeight:800}}>Risk {h.riskScore}/100 • {h.riskLevel}</div><div style={{marginTop:8,color:"#2563eb",fontSize:12}}>View details <ArrowRight size={13}/></div></button>)}</div>
 {selected&&<div style={{marginTop:18,maxWidth:650}}><HabitationDetails habitation={selected} onClose={()=>setSelected(null)} onFindRelocation={()=>location.href="/relocation-sites"}/></div>}
 </div>
}
