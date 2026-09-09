import { useState } from "react";
import { Waves, Mountain, CloudRain, Users, AlertTriangle, MapPin, ChevronDown } from "lucide-react";

interface Props {
  visibleLayers: Record<string,boolean>;
  onLayerChange:(id:string)=>void;
}
const layers=[
  ["flood","Flood",<Waves size={16}/>],
  ["landslide","Landslide",<Mountain size={16}/>],
  ["coastal","Coastal Erosion",<Waves size={16}/>],
  ["cloudburst","Cloudburst",<CloudRain size={16}/>],
  ["population","Population",<Users size={16}/>],
  ["red-zones","Red Zones",<AlertTriangle size={16}/>],
  ["relocation-sites","Relocation Sites",<MapPin size={16}/>]
] as const;

export default function MapControls({visibleLayers,onLayerChange}:Props){
  const [open,setOpen]=useState(true);
  return <div style={{position:"absolute",top:16,left:16,width:245,background:"rgba(255,255,255,.96)",borderRadius:12,boxShadow:"0 5px 20px rgba(0,0,0,.18)",zIndex:10,overflow:"hidden"}}>
    <button onClick={()=>setOpen(v=>!v)} style={{width:"100%",padding:"13px 15px",border:0,background:"transparent",display:"flex",justifyContent:"space-between",fontWeight:800,cursor:"pointer"}}>
      Map Layers <ChevronDown size={18} style={{transform:open?"rotate(180deg)":"none"}}/>
    </button>
    {open&&<div style={{borderTop:"1px solid #e5e7eb",padding:"8px"}}>
      {layers.map(([id,name,icon])=><button key={id} onClick={()=>onLayerChange(id)} style={{width:"100%",display:"flex",alignItems:"center",gap:9,padding:"9px 7px",border:0,borderRadius:7,background:visibleLayers[id]?"#eff6ff":"transparent",color:visibleLayers[id]?"#1d4ed8":"#475569",cursor:"pointer",textAlign:"left"}}>
        {icon}<span style={{flex:1}}>{name}</span><span style={{fontSize:11,fontWeight:800}}>{visibleLayers[id]?"ON":"OFF"}</span>
      </button>)}
    </div>}
  </div>
}
