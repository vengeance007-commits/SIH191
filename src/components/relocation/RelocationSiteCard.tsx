import { MapPin, Users, ShieldCheck, Hospital, School, Car, Droplets, Zap } from "lucide-react";
import type { RelocationSite } from "../../data/mockData";
export default function RelocationSiteCard({site,recommended,onSelect}:{site:RelocationSite;recommended?:boolean;onSelect?:()=>void}){
 const utilization=site.capacity?Math.round((site.capacity*.5/site.capacity)*100):0;
 return <div style={{background:"#fff",border:recommended?"2px solid #16a34a":"1px solid #e5e7eb",borderRadius:14,padding:18,boxShadow:"0 3px 12px rgba(0,0,0,.06)"}}>
  {recommended&&<div style={{display:"inline-block",padding:"5px 9px",borderRadius:20,background:"#dcfce7",color:"#15803d",fontSize:10,fontWeight:800,marginBottom:10}}>✓ RECOMMENDED SITE</div>}
  <div style={{display:"flex",justifyContent:"space-between"}}><div><h3 style={{margin:0,display:"flex",gap:6}}><MapPin size={18} color="#2563eb"/>{site.name}</h3><small style={{color:"#64748b"}}>{site.id}</small></div><div style={{textAlign:"center"}}><b style={{fontSize:23,color:site.suitabilityScore>=80?"#16a34a":"#ca8a04"}}>{site.suitabilityScore}</b><small style={{display:"block"}}>Suitability</small></div></div>
  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,marginTop:14}}><div style={{padding:10,background:"#f8fafc",borderRadius:9}}><Users size={15}/> Capacity<b style={{display:"block"}}>{site.capacity.toLocaleString()}</b></div><div style={{padding:10,background:"#f8fafc",borderRadius:9}}><MapPin size={15}/> Distance<b style={{display:"block"}}>{site.distance} km</b></div></div>
  <div style={{marginTop:12,fontSize:11,color:"#475569",display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}><span><Hospital size={13}/> {site.facilities.hospital}</span><span><School size={13}/> {site.facilities.school}</span><span><Car size={13}/> {site.facilities.roadAccess}</span><span><Droplets size={13}/> {site.facilities.water}</span><span><Zap size={13}/> {site.facilities.electricity}</span></div>
  <button onClick={onSelect} style={{marginTop:14,width:"100%",padding:10,border:"1px solid #2563eb",borderRadius:8,background:"#eff6ff",color:"#1d4ed8",fontWeight:800,cursor:"pointer"}}>View Site Details</button>
 </div>
}
