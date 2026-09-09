import { Users } from "lucide-react";
export default function CapacityIndicator({population,capacity}:{population:number;capacity:number}){
 const u=capacity?Math.round(population/capacity*100):0; const status=population>capacity?"Insufficient":u>80?"Near Capacity":"Sufficient"; const c=status==="Insufficient"?"#dc2626":status==="Near Capacity"?"#ca8a04":"#16a34a";
 return <div style={{background:"#fff",padding:18,borderRadius:14,border:"1px solid #e5e7eb"}}><div style={{display:"flex",justifyContent:"space-between"}}><h3 style={{margin:0}}><Users size={17}/> Site Capacity</h3><b style={{color:c}}>{status}</b></div><p>{population.toLocaleString()} people / {capacity.toLocaleString()} capacity</p><div style={{height:9,background:"#e2e8f0",borderRadius:9}}><div style={{width:`${Math.min(u,100)}%`,height:"100%",background:c,borderRadius:9}}/></div><small>{u}% utilization</small></div>
}
