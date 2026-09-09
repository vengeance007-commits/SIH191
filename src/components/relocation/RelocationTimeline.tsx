const phases=[["Immediate","0–7 Days","#dc2626"],["Short-term","1–3 Months","#f97316"],["Medium-term","3–12 Months","#2563eb"]];
export default function RelocationTimeline({active,onSelect}:{active:string;onSelect:(p:string)=>void}){
 return <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{phases.map(([p,t,c])=><button key={p} onClick={()=>onSelect(p)} style={{flex:"1 1 180px",padding:14,border:`2px solid ${active===p?c:"#e2e8f0"}`,borderRadius:12,background:active===p?"#f8fafc":"#fff",cursor:"pointer",textAlign:"left"}}><b style={{color:c}}>{p}</b><div style={{fontSize:12,color:"#64748b"}}>{t}</div></button>)}</div>
}
