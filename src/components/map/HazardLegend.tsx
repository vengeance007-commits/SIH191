import { MapPin, ShieldAlert } from "lucide-react";
export default function HazardLegend(){
  const items=[["#dc2626","Red Zone","Unsafe for permanent habitation"],["#f97316","High Risk","Immediate risk assessment"],["#eab308","Moderate Risk","Monitoring required"],["#16a34a","Low Risk","Relatively safer"],["#2563eb","Relocation Site","Potential safer alternative"]];
  return <div style={{position:"absolute",right:16,bottom:16,width:245,padding:14,background:"rgba(255,255,255,.96)",borderRadius:12,boxShadow:"0 5px 20px rgba(0,0,0,.18)",zIndex:10}}>
    <div style={{display:"flex",alignItems:"center",gap:7,fontWeight:800,marginBottom:10}}><ShieldAlert size={17}/> Risk Legend</div>
    {items.map(([color,label,desc])=><div key={label} style={{display:"flex",gap:8,margin:"8px 0",alignItems:"flex-start"}}>
      <span style={{width:16,height:16,minWidth:16,borderRadius:4,background:color,marginTop:2}}/>{label==="Relocation Site"?<MapPin size={16} color={color}/>:null}
      <div><b style={{fontSize:12}}>{label}</b><div style={{fontSize:10,color:"#64748b"}}>{desc}</div></div>
    </div>)}
  </div>
}
