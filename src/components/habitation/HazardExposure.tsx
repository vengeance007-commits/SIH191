export default function HazardExposure({hazards}:{hazards:{flood:number;landslide:number;coastal:number;cloudburst:number}}){
 const rows=[["Flood",hazards.flood],["Landslide",hazards.landslide],["Coastal Erosion",hazards.coastal],["Cloudburst",hazards.cloudburst]];
 return <div style={{background:"#fff",padding:18,borderRadius:14,border:"1px solid #e5e7eb"}}><h3 style={{marginTop:0}}>Hazard Exposure</h3>{rows.map(([name,v])=><div key={name as string} style={{margin:"12px 0"}}><div style={{display:"flex",justifyContent:"space-between",fontSize:12}}><span>{name}</span><b>{v}</b></div><div style={{height:8,background:"#e2e8f0",borderRadius:8}}><div style={{width:`${v}%`,height:"100%",background:"#2563eb",borderRadius:8}}/></div></div>)}</div>
}
