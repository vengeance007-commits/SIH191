import { useState } from "react";
import { habitations } from "../data/mockData";
import RelocationTimeline from "../components/relocation/RelocationTimeline";
const destinations=["Safe Site A","Community Ground B","Hilltop Settlement C","Relief Campus D"];
const timeline:{[k:string]:string}={"Immediate":"0–7 Days","Short-term":"1–3 Months","Medium-term":"3–12 Months"};
export default function RelocationPlan(){
 const [phase,setPhase]=useState("Immediate");
 const tasks=habitations.filter(h=>h.priority===phase);
 return <div style={{minHeight:"100vh",background:"#f1f5f9",padding:24}}><h1>Relocation Plan</h1><p style={{color:"#64748b"}}>Prioritized relocation roadmap for vulnerable habitations.</p>
 <RelocationTimeline active={phase} onSelect={setPhase}/>
 <div style={{marginTop:18,display:"grid",gap:12}}>{tasks.map((h,i)=><div key={h.id} style={{background:"#fff",padding:16,borderRadius:13,border:"1px solid #e2e8f0"}}><div style={{display:"flex",justifyContent:"space-between",gap:10,flexWrap:"wrap"}}><div><b>{h.name}</b><div style={{fontSize:12,color:"#64748b"}}>{h.population.toLocaleString()} people • Risk {h.riskScore}/100</div></div><span style={{padding:"5px 9px",background:"#eff6ff",color:"#1d4ed8",borderRadius:20,fontSize:11,fontWeight:800}}>Pending</span></div><div style={{marginTop:10,fontSize:12}}>Destination: <b>{destinations[i%destinations.length]}</b> • Timeline: <b>{timeline[phase]}</b></div></div>)}{tasks.length===0&&<div style={{background:"#fff",padding:30,borderRadius:13,textAlign:"center"}}>No relocation cases in this phase.</div>}</div>
 </div>
}
