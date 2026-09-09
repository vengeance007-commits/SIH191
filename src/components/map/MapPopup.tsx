import { X, MapPin, Users, ShieldAlert, Clock } from "lucide-react";
import type { Habitation } from "../../data/mockData";

interface Props { habitation:Habitation|null; onClose:()=>void; onFindRelocation?:()=>void; }
export default function MapPopup({habitation,onClose,onFindRelocation}:Props){
  if(!habitation) return null;
  const c={Red:"#dc2626",High:"#f97316",Moderate:"#eab308",Low:"#16a34a"}[habitation.riskLevel];
  return <div style={{position:"absolute",right:16,top:16,width:330,maxHeight:"calc(100% - 32px)",overflowY:"auto",background:"#fff",borderRadius:14,boxShadow:"0 8px 30px rgba(0,0,0,.22)",zIndex:20}}>
    <div style={{padding:15,borderBottom:"1px solid #e5e7eb",display:"flex",justifyContent:"space-between"}}>
      <div><div style={{fontWeight:800,display:"flex",gap:7}}><MapPin size={18} color="#2563eb"/>{habitation.name}</div><small style={{color:"#64748b"}}>{habitation.location}</small></div>
      <button onClick={onClose} style={{border:0,background:"#f1f5f9",borderRadius:7,width:30,height:30,cursor:"pointer"}}><X size={16}/></button>
    </div>
    <div style={{padding:15}}>
      <div style={{padding:13,borderRadius:10,background:"#f8fafc",border:`1px solid ${c}55`}}>
        <div style={{display:"flex",justifyContent:"space-between"}}><span>Overall Risk</span><b style={{fontSize:23,color:c}}>{habitation.riskScore}/100</b></div>
        <div style={{height:7,background:"#e2e8f0",borderRadius:8,marginTop:8}}><div style={{width:`${habitation.riskScore}%`,height:"100%",background:c,borderRadius:8}}/></div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,marginTop:10}}>
        <div style={{padding:10,background:"#f8fafc",borderRadius:9}}><Users size={15}/><small>Population</small><b style={{display:"block"}}>{habitation.population.toLocaleString()}</b></div>
        <div style={{padding:10,background:"#f8fafc",borderRadius:9}}><Clock size={15}/><small>Priority</small><b style={{display:"block",color:c}}>{habitation.priority}</b></div>
      </div>
      <h4 style={{margin:"16px 0 8px"}}>Hazard Exposure</h4>
      {Object.entries(habitation.hazards).map(([k,v])=><div key={k} style={{marginBottom:8}}><div style={{display:"flex",justifyContent:"space-between",fontSize:11}}><span>{k[0].toUpperCase()+k.slice(1)}</span><b>{v}</b></div><div style={{height:6,background:"#e2e8f0",borderRadius:6}}><div style={{width:`${v}%`,height:"100%",background:v>=80?"#dc2626":v>=60?"#f97316":"#eab308",borderRadius:6}}/></div></div>)}
      <h4 style={{margin:"16px 0 8px"}}>Disaster History</h4>
      {habitation.disasterHistory.map(e=><div key={e.id} style={{padding:"7px 0",borderBottom:"1px solid #f1f5f9",fontSize:11}}><b>{e.year} • {e.type}</b><div style={{color:"#64748b"}}>{e.description}</div></div>)}
      <button onClick={onFindRelocation} style={{marginTop:14,width:"100%",padding:11,border:0,borderRadius:9,background:"#2563eb",color:"#fff",fontWeight:800,cursor:"pointer"}}><ShieldAlert size={15} style={{verticalAlign:"middle",marginRight:6}}/>Find Safe Relocation Sites</button>
    </div>
  </div>
}
