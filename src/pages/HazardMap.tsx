import { useMemo, useState } from "react";
import { Activity, AlertTriangle, MapPin, Users, ShieldAlert, ArrowRight } from "lucide-react";
import HazardMapView from "../components/map/HazardMapView";
import MapControls from "../components/map/MapControls";
import HazardLegend from "../components/map/HazardLegend";
import MapPopup from "../components/map/MapPopup";
import { habitations, relocationSites } from "../data/mockData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from "recharts";

export default function HazardMap(){
 const [layers,setLayers]=useState<Record<string,boolean>>({"flood":false,"landslide":false,"coastal":false,"cloudburst":false,"population":false,"red-zones":true,"relocation-sites":true});
 const [selected,setSelected]=useState<string|null>(null);
 const [selectedSite,setSelectedSite]=useState<string|null>(null);
 const risk=useMemo(()=>["Red","High","Moderate","Low"].map(x=>({name:x,value:habitations.filter(h=>h.riskLevel===x).length})),[]);
 const priority=useMemo(()=>["Immediate","Short-term","Medium-term"].map(x=>({name:x,value:habitations.filter(h=>h.priority===x).length})),[]);
 const exposure=useMemo(()=>[{name:"Flood",value:Math.round(habitations.reduce((s,h)=>s+h.hazards.flood,0)/habitations.length)},{name:"Landslide",value:Math.round(habitations.reduce((s,h)=>s+h.hazards.landslide,0)/habitations.length)},{name:"Coastal",value:Math.round(habitations.reduce((s,h)=>s+h.hazards.coastal,0)/habitations.length)},{name:"Cloudburst",value:Math.round(habitations.reduce((s,h)=>s+h.hazards.cloudburst,0)/habitations.length)}],[]);
 const populationRisk=useMemo(()=>["Red","High","Moderate","Low"].map(x=>({name:x,value:habitations.filter(h=>h.riskLevel===x).reduce((s,h)=>s+h.population,0)})),[]);
 const history=useMemo(()=>Array.from(new Set(habitations.flatMap(h=>h.disasterHistory.map(e=>e.year))).values()).sort().map(y=>({year:y,count:habitations.flatMap(h=>h.disasterHistory).filter(e=>e.year===y).length})),[]);
 const selectedHab=habitations.find(h=>h.id===selected)??null;
 const selectedReloc=relocationSites.find(s=>s.id===selectedSite)??null;
 const immediate=habitations.filter(h=>h.priority==="Immediate").length;
 const atRisk=habitations.filter(h=>h.riskLevel==="Red"||h.riskLevel==="High").reduce((s,h)=>s+h.population,0);
 const toggle=(id:string)=>setLayers(x=>({...x,[id]:!x[id]}));
 const card=(icon:any,label:string,value:string)=> <div style={{background:"#fff",border:"1px solid #e5e7eb",borderRadius:12,padding:16,display:"flex",gap:11,alignItems:"center"}}>{icon}<div><div style={{fontSize:11,color:"#64748b"}}>{label}</div><b style={{fontSize:22}}>{value}</b></div></div>;
 return <div style={{minHeight:"100vh",background:"#f1f5f9",padding:24}}>
   <header style={{marginBottom:16}}><h1 style={{margin:0,fontSize:25}}>Multi-Hazard Risk Map</h1><p style={{margin:"4px 0",color:"#64748b"}}>Satellite GIS visualization, vulnerable habitations and relocation decision support</p></header>
   <section style={{height:620,position:"relative",borderRadius:16,overflow:"hidden",boxShadow:"0 5px 20px rgba(0,0,0,.12)"}}>
    <HazardMapView visibleLayers={layers} onSelectHabitation={setSelected} onSelectSite={setSelectedSite}/>
    <MapControls visibleLayers={layers} onLayerChange={toggle}/>
    <HazardLegend/>
    {selectedHab&&<MapPopup habitation={selectedHab} onClose={()=>setSelected(null)} onFindRelocation={()=>location.href="/relocation-sites"}/>}
    {selectedReloc&&<div style={{position:"absolute",right:16,top:16,width:300,background:"#fff",padding:16,borderRadius:12,zIndex:19,boxShadow:"0 6px 25px rgba(0,0,0,.2)"}}><b>📍 {selectedReloc.name}</b><p style={{fontSize:12}}>Suitability: <strong>{selectedReloc.suitabilityScore}/100</strong><br/>Capacity: {selectedReloc.capacity.toLocaleString()}<br/>Distance: {selectedReloc.distance} km</p><button onClick={()=>setSelectedSite(null)} style={{padding:7,border:0,borderRadius:7,cursor:"pointer"}}>Close</button></div>}
    <div style={{position:"absolute",left:16,bottom:16,zIndex:11,background:"rgba(15,23,42,.82)",color:"#fff",padding:"8px 12px",borderRadius:8,fontSize:11}}>Satellite imagery • Demo decision-support data</div>
   </section>

   <section style={{marginTop:20}}>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:12}}>
      {card(<MapPin color="#2563eb"/>,"Habitations Analysed",String(habitations.length))}
      {card(<AlertTriangle color="#dc2626"/>,"High / Red Risk",String(habitations.filter(h=>h.riskLevel==="Red"||h.riskLevel==="High").length))}
      {card(<Users color="#f97316"/>,"Population at Risk",atRisk.toLocaleString())}
      {card(<ShieldAlert color="#dc2626"/>,"Immediate Relocation",String(immediate))}
      {card(<MapPin color="#16a34a"/>,"Relocation Sites",String(relocationSites.length))}
    </div>

    <h2 style={{margin:"26px 0 12px"}}>Risk & Relocation Overview</h2>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:14}}>
      <ChartCard title="Risk Category Distribution"><ResponsiveContainer width="100%" height={240}><PieChart><Pie data={risk} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={78} label>{risk.map((e,i)=><Cell key={e.name} fill={["#dc2626","#f97316","#eab308","#16a34a"][i]}/>)}</Pie><Tooltip/></PieChart></ResponsiveContainer></ChartCard>
      <ChartCard title="Relocation Priority"><ResponsiveContainer width="100%" height={240}><BarChart data={priority}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="name"/><YAxis allowDecimals={false}/><Tooltip/><Bar dataKey="value" fill="#2563eb"/></BarChart></ResponsiveContainer></ChartCard>
      <ChartCard title="Average Hazard Exposure"><ResponsiveContainer width="100%" height={240}><BarChart data={exposure}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="name"/><YAxis domain={[0,100]}/><Tooltip/><Bar dataKey="value" fill="#f97316"/></BarChart></ResponsiveContainer></ChartCard>
      <ChartCard title="Population by Risk Level"><ResponsiveContainer width="100%" height={240}><BarChart data={populationRisk}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="name"/><YAxis/><Tooltip/><Bar dataKey="value" fill="#dc2626"/></BarChart></ResponsiveContainer></ChartCard>
      <ChartCard title="Disaster History by Year"><ResponsiveContainer width="100%" height={240}><LineChart data={history}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="year"/><YAxis allowDecimals={false}/><Tooltip/><Line type="monotone" dataKey="count" stroke="#2563eb" strokeWidth={3}/></LineChart></ResponsiveContainer></ChartCard>
      <ChartCard title="Relocation Site Suitability"><ResponsiveContainer width="100%" height={240}><BarChart data={relocationSites.map(s=>({name:s.name.replace("Community Ground ","Ground ").replace("Hilltop Settlement ","Hilltop "),score:s.suitabilityScore}))}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="name"/><YAxis domain={[0,100]}/><Tooltip/><Bar dataKey="score" fill="#16a34a"/></BarChart></ResponsiveContainer></ChartCard>
    </div>

    <div style={{marginTop:16,background:"#fff",borderRadius:14,padding:18,border:"1px solid #e5e7eb"}}>
      <h3 style={{marginTop:0,display:"flex",gap:7,alignItems:"center"}}><Activity size={18} color="#2563eb"/> Key Risk Insights</h3>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:10}}>
       <Insight label="Highest-risk habitation" value={habitations.reduce((a,b)=>a.riskScore>b.riskScore?a:b).name}/>
       <Insight label="Most exposed hazard" value={exposure.reduce((a,b)=>a.value>b.value?a:b).name}/>
       <Insight label="Best relocation site" value={relocationSites.reduce((a,b)=>a.suitabilityScore>b.suitabilityScore?a:b).name}/>
       <Insight label="Highest site capacity" value={relocationSites.reduce((a,b)=>a.capacity>b.capacity?a:b).name}/>
      </div>
    </div>
    <div style={{marginTop:14,textAlign:"center",color:"#64748b",fontSize:11}}>Decision-support prototype • Values shown are mock/demo data and should be replaced by validated hazard datasets before operational use.</div>
   </section>
 </div>
}
function ChartCard({title,children}:{title:string;children:any}){return <div style={{background:"#fff",border:"1px solid #e5e7eb",borderRadius:14,padding:15}}><h3 style={{fontSize:14,margin:"0 0 5px"}}>{title}</h3>{children}</div>}
function Insight({label,value}:{label:string;value:string}){return <div style={{padding:12,background:"#f8fafc",borderRadius:9}}><small style={{color:"#64748b"}}>{label}</small><div style={{fontWeight:800,marginTop:4}}>{value}</div></div>}
