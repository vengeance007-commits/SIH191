import type { RelocationSite } from "../../data/mockData";
export default function SiteSuitability({site}:{site:RelocationSite}){
 const factors=[["Safety",site.suitability.safety],["Capacity",site.suitability.capacity],["Accessibility",site.suitability.accessibility],["Facilities",site.suitability.facilities],["Distance",site.suitability.distance]];
 return <div style={{background:"#fff",padding:18,borderRadius:14,border:"1px solid #e5e7eb"}}><h3 style={{marginTop:0}}>Site Suitability • {site.name}</h3>{factors.map(([n,v])=><div key={n as string} style={{margin:"11px 0"}}><div style={{display:"flex",justifyContent:"space-between",fontSize:12}}><span>{n}</span><b>{v}</b></div><div style={{height:7,background:"#e2e8f0",borderRadius:7}}><div style={{width:`${v}%`,height:"100%",background:"#2563eb",borderRadius:7}}/></div></div>)}</div>
}
