import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { habitations, relocationSites, getRiskColor } from "../../data/mockData";
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
     center: [76.13, 11.68],
zoom: 10.2,
pitch: 45,
bearing: -18,
maxPitch: 60
    });
    mapRef.current = map;
    map.addControl(new maplibregl.NavigationControl(),"top-right");

    map.on("load",()=>
      
      {
              // Wayanad District Boundary

      map.addSource("wayanad-district", {
  type: "geojson",
  data: "/data/processed/wayanad_district.geojson",
});
      map.addLayer({
  id: "wayanad-fill",
  type: "fill",
  source: "wayanad-district",
  paint: {
    "fill-color": "#14532D",
    "fill-opacity": 0.55
  }
});

map.addLayer({
  id: "wayanad-outline",
  type: "line",
  source: "wayanad-district",
  paint: {
    "line-color": "#00E5FF",
    "line-width": 4
  }
});

      // Taluk Boundaries
      map.addSource("wayanad-taluks", {
        type: "geojson",
        data: "/data/processed/wayanad_taluks.geojson",
      });

      map.addLayer({
        id: "taluk-boundaries",
        type: "line",
        source: "wayanad-taluks",
        paint: {
          "line-color":"#FFD60A",
          "line-width":2.5,
        },
      });

      // Village Boundaries
map.addSource("wayanad-villages", {
  type: "geojson",
  data: "/data/processed/wayanad_villages.geojson",
});

map.addLayer({
  id: "village-boundaries",
  type: "line",
  source: "wayanad-villages",
  minzoom: 10,
  paint: {
    "line-color": "#FFFFFF",
    "line-width": [
      "interpolate",
      ["linear"],
      ["zoom"],
      10, 0.4,
      12, 0.8,
      14, 1.2
    ],
    "line-opacity": 0.35
  }
});

      // Village Centroid Points
map.addSource("village-centers", {
  type: "geojson",
  data: "/data/processed/wayanad_village_points.geojson",
});

map.addLayer({
  id: "village-centers",
  type: "circle",
  source: "village-centers",
  minzoom: 11.5, // only appear after zooming in
  paint: {
    "circle-radius": [
      "interpolate",
      ["linear"],
      ["zoom"],
      11.5, 3,
      13, 5,
      15, 7
    ],
    "circle-color": "#38BDF8",
    "circle-stroke-color": "#FFFFFF",
    "circle-stroke-width": 1.5
  }
});

// Relocation site markers
relocationSites.forEach((site) => {
  const el = document.createElement("div");

  el.style.cssText = `
width:20px;
height:20px;
background:#2563EB;
border:3px solid white;
border-radius:50%;
box-shadow:0 0 20px rgba(37,99,235,.95);
cursor:pointer;
animation:pulse 1.5s infinite;
`;

  el.onclick = () => onSelectSite?.(site.id);

  new maplibregl.Marker({ element: el })
    .setLngLat([site.longitude, site.latitude])
    .addTo(map);
});

// Pulse animation
const style = document.createElement("style");
style.innerHTML = `
@keyframes pulse{
  0%{box-shadow:0 0 0 0 rgba(37,99,235,.7);}
  70%{box-shadow:0 0 0 14px rgba(37,99,235,0);}
  100%{box-shadow:0 0 0 0 rgba(37,99,235,0);}
}`;
document.head.appendChild(style);

      // Real KSDMA Landslide Zones
      map.addSource("landslides", {
        type: "geojson",
        data: "/data/processed/landslide_zones.geojson",
      });

      map.addLayer({
  id: "landslide-fill",
  type: "fill",
  source: "landslides",
  paint: {
    "fill-color": "#DC2626",
    "fill-opacity": 0.22
  }
});

map.addLayer({
  id: "landslide-outline",
  type: "line",
  source: "landslides",
  paint: {
    "line-color": "#7F1D1D",
    "line-width": 1.2
  }
});
            // Real Wayanad Village Markers
      map.addSource("village-points", {
  type: "geojson",
  data: "/data/processed/wayanad_village_points.geojson",
});
const villagePopup = new maplibregl.Popup({
  closeButton: false,
  closeOnClick: false,
});

map.on("mouseenter", "village-centers", () => {
  map.getCanvas().style.cursor = "pointer";
});

map.on("mouseleave", "village-centers", () => {
  map.getCanvas().style.cursor = "";
  villagePopup.remove();
});

map.on("mousemove", "village-centers", (e) => {
  const feature = e.features?.[0];
  if (!feature) return;

  villagePopup
    .setLngLat(e.lngLat)
    .setHTML(`
      <div style="font-family:sans-serif">
        <strong>${feature.properties?.NAME || "Village"}</strong><br/>
        Taluk: ${feature.properties?.SUB_DIST || "Wayanad"}
      </div>
    `)
    .addTo(map);
});

map.on("click", "village-centers", (e) => {
  const feature = e.features?.[0];
  if (!feature) return;

  onSelectHabitation?.(feature.properties?.NAME || "Village");
});

    
            const popup = new maplibregl.Popup({
        closeButton: false,
        closeOnClick: false,
      });

      map.on("mousemove", "village-points", (e) => {
        const feature = e.features?.[0];
        if (!feature) return;

        popup
          .setLngLat(e.lngLat)
          .setHTML(`
            <div style="font-family:sans-serif">
              <strong>${feature.properties?.NAME || "Village"}</strong><br/>
              ${feature.properties?.SUB_DIST || ""}
            </div>
          `)
          .addTo(map);

        map.getCanvas().style.cursor = "pointer";
      });

      map.on("mouseleave", "village-points", () => {
        popup.remove();
        map.getCanvas().style.cursor = "";
      });

      map.addSource("red-zones", {
  type: "geojson",
  data: "/data/processed/landslide_zones.geojson",
});

map.addLayer({
  id: "red-zone-fill",
  type: "fill",
  source: "red-zones",
  paint: {
    "fill-color": "#DC2626",
    "fill-opacity": 0.38
  }
});

map.addLayer({
  id: "red-zone-line",
  type: "line",
  source: "red-zones",
  paint: {
    "line-color": "#7F1D1D",
    "line-width": 1
  }
});

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
        el.style.cssText = `
width:22px;
height:22px;
border-radius:50%;
background:#2563EB;
border:3px solid white;
box-shadow:0 0 18px rgba(37,99,235,.9);
cursor:pointer;
animation:pulse 2s infinite;
`;
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
    toggle("red-zone-fill", visibleLayers["red-zones"] !== false);
toggle("red-zone-line", visibleLayers["red-zones"] !== false);

toggle("landslide-fill", visibleLayers["landslide"] === true);
toggle("landslide-outline", visibleLayers["landslide"] === true);
toggle("village-centers", visibleLayers["population"]);
toggle("village-boundaries", visibleLayers["population"]);
toggle("taluk-boundaries", true);
toggle("wayanad-outline", true);
  },[visibleLayers]);
  

  return <div ref={container} style={{width:"100%",height:"100%"}} />;
}
