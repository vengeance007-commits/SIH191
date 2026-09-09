import { MapPin, Users, ShieldAlert, X } from "lucide-react";
import type { Habitation } from "../../data/mockData";
export default function HabitationDetails({habitation,onClose,onFindRelocation}:{habitation:Habitation|null;onClose?:()=>void;onFindRelocation?:()=>void}){
 if(!habitation)return null; const c={Red:"#dc2626",High:"#f97316",Moderate:"#eab308",Low:"#16a34a"}[habitation.riskLevel];
 return <div style={{background:"#fff",borderRadius:14,padding:18,boxShadow:"0 4px 18px rgba(0,0,0,.08)"}}>
  <div style={{display:"flex",justifyContent:"space-between"}}><div><h2 style={{margin:0}}>{habitation.name}</h2><small style={{color:"#64748b"}}><MapPin size={13}/> {habitation.location}</small></div>{onClose&&<button onClick={onClose} style={{border:0,background:"#f1f5f9",borderRadius:7}}><X size={16}/></button>}</div>
  <div style={{marginTop:15,display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}><div style={{background:"#f8fafc",padding:12,borderRadius:9}}><Users size={16}/><small>Population</small><b style={{display:"block"}}>{habitation.population.toLocaleString()}</b></div><div style={{background:"#f8fafc",padding:12,borderRadius:9}}><ShieldAlert size={16}/><small>Risk</small><b style={{display:"block",color:c}}>{habitation.riskScore}/100</b></div></div>
  <p style={{margin:"12px 0",color:c,fontWeight:800}}>{habitation.riskLevel} Risk • {habitation.priority}</p>
  {onFindRelocation&&<button onClick={onFindRelocation} style={{width:"100%",padding:10,border:0,borderRadius:8,background:"#2563eb",color:"#fff",fontWeight:800}}>Find Safe Relocation Sites</button>}
 </div>
}
