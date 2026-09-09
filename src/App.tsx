import { BrowserRouter, Navigate, Route, Routes, NavLink } from "react-router-dom";
import { Map, Users, MapPinned, CalendarRange } from "lucide-react";
import HazardMap from "./pages/HazardMap";
import Habitations from "./pages/Habitations";
import RelocationSites from "./pages/RelocationSites";
import RelocationPlan from "./pages/RelocationPlan";

function Layout({children}:{children:React.ReactNode}){
 const links=[["/hazard-map","Hazard Map",Map],["/habitations","Habitations",Users],["/relocation-sites","Relocation Sites",MapPinned],["/relocation-plan","Relocation Plan",CalendarRange]];
 return <div style={{minHeight:"100vh"}}><nav style={{height:60,background:"#0f172a",color:"#fff",display:"flex",alignItems:"center",gap:8,padding:"0 18px",position:"sticky",top:0,zIndex:50}}>
  <div style={{fontWeight:900,marginRight:15}}>SIH • DISASTER GIS</div>{links.map(([to,label,Icon])=><NavLink key={to as string} to={to as string} style={({isActive})=>({display:"flex",alignItems:"center",gap:6,padding:"9px 11px",borderRadius:8,textDecoration:"none",color:"#fff",background:isActive?"#1d4ed8":"transparent",fontSize:13})}>{/* @ts-ignore */}<Icon size={15}/>{label as string}</NavLink>)}
 </nav>{children}</div>
}
export default function App(){return <BrowserRouter><Layout><Routes><Route path="/" element={<Navigate to="/hazard-map" replace/>}/><Route path="/hazard-map" element={<HazardMap/>}/><Route path="/habitations" element={<Habitations/>}/><Route path="/relocation-sites" element={<RelocationSites/>}/><Route path="/relocation-plan" element={<RelocationPlan/>}/><Route path="*" element={<Navigate to="/hazard-map" replace/>}/></Routes></Layout></BrowserRouter>}
