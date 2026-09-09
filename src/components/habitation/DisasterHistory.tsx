import { CalendarDays } from "lucide-react";
import type { DisasterEvent } from "../../data/mockData";
export default function DisasterHistory({events}:{events:DisasterEvent[]}){
 return <div style={{background:"#fff",padding:18,borderRadius:14,border:"1px solid #e5e7eb"}}><h3 style={{marginTop:0}}>Disaster History</h3>{events.map(e=><div key={e.id} style={{display:"flex",gap:10,padding:"10px 0",borderBottom:"1px solid #f1f5f9"}}><CalendarDays size={17} color="#2563eb"/><div><b>{e.year} • {e.type}</b><div style={{fontSize:12,color:"#64748b"}}>{e.description}</div></div></div>)}</div>
}
