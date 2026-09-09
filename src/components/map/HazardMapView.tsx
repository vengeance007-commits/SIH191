import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { habitations, relocationSites, redZoneData, getRiskColor } from "../../data/mockData";

interface Props {
  visibleLayers: Record<string, boolean>;
  onSelectHabitation?: (id: string) => void;
  onSelectSite?: (id: string) => void;
  satellite?: boolean;
}

export default function HazardMapView({visibleLayers,onSelectHabitation,onSelectSite}: Props) {
  const container = useRef<HTMLDivElement|null>(null);
  const mapRef = useRef<maplibregl.Map|null>(null);

  useEffect(() => {
    if (!container.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: container.current,
      style: {
        version: 8,
        sources: {
          satellite: {
            type:"raster",
            tiles:["https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"],
            tileSize:256,
            attribution:"Tiles © Esri"
          },
          streets: {
            type:"raster",
            tiles:["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize:256,
            attribution:"© OpenStreetMap contributors"
          }
        },
        layers:[{id:"base-satellite",type:"raster",source:"satellite"}]
      },
      center:[83.30,17.72],
      zoom:11
    });
    mapRef.current = map;
    map.addControl(new maplibregl.NavigationControl(),"top-right");

    map.on("load",()=>{
      if (!map.getSource("red-zones")) {
        map.addSource("red-zones",{type:"geojson",data:redZoneData as any});
        map.addLayer({id:"red-zone-fill",type:"fill",source:"red-zones",paint:{"fill-color":"#dc2626","fill-opacity":0.38}});
        map.addLayer({id:"red-zone-line",type:"line",source:"red-zones",paint:{"line-color":"#991b1b","line-width":3}});
      }

      habitations.forEach(h=>{
        const el=document.createElement("button");
        el.type="button";
        el.title=`${h.name} • Risk ${h.riskScore}/100`;
        el.style.cssText=`width:18px;height:18px;border-radius:50%;border:3px solid white;background:${getRiskColor(h.riskLevel)};box-shadow:0 2px 8px rgba(0,0,0,.45);cursor:pointer`;
        el.onclick=()=>onSelectHabitation?.(h.id);
        new maplibregl.Marker({element:el}).setLngLat([h.longitude,h.latitude]).addTo(map);
      });

      relocationSites.forEach(s=>{
        const el=document.createElement("button");
        el.type="button"; el.title=s.name;
        el.style.cssText="width:24px;height:24px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:2px solid white;background:#2563eb;box-shadow:0 2px 8px rgba(0,0,0,.45);cursor:pointer";
        el.onclick=()=>onSelectSite?.(s.id);
        new maplibregl.Marker({element:el}).setLngLat([s.longitude,s.latitude]).addTo(map);
      });
    });

    return ()=>{ map.remove(); mapRef.current=null; };
  },[onSelectHabitation,onSelectSite]);

  useEffect(()=>{
    const map=mapRef.current;
    if(!map) return;
    const toggle=(id:string,show:boolean)=>{ if(map.getLayer(id)) map.setLayoutProperty(id,"visibility",show?"visible":"none"); };
    toggle("red-zone-fill",visibleLayers["red-zones"]!==false);
    toggle("red-zone-line",visibleLayers["red-zones"]!==false);
  },[visibleLayers]);

  return <div ref={container} style={{width:"100%",height:"100%"}} />;
}
