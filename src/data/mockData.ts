export type RiskLevel = "Red" | "High" | "Moderate" | "Low";
export type RelocationPriority = "Immediate" | "Short-term" | "Medium-term";
export type DisasterType = "Flood" | "Landslide" | "Coastal Erosion" | "Cloudburst";

export interface HazardScores {
  flood: number;
  landslide: number;
  coastal: number;
  cloudburst: number;
}
export interface DisasterEvent {
  id: string;
  type: DisasterType;
  year: number;
  severity: "Severe" | "High" | "Moderate";
  description: string;
}
export interface Habitation {
  id: string;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  population: number;
  riskScore: number;
  riskLevel: RiskLevel;
  priority: RelocationPriority;
  hazards: HazardScores;
  disasterHistory: DisasterEvent[];
}
export interface Facilities {
  hospital: string;
  school: string;
  roadAccess: string;
  water: string;
  electricity: string;
}
export interface RelocationSite {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  capacity: number;
  distance: number;
  suitabilityScore: number;
  suitability: {
    safety: number;
    capacity: number;
    accessibility: number;
    facilities: number;
    distance: number;
  };
  facilities: Facilities;
}

export const habitations: Habitation[] = [
  {
    id:"H001", name:"Demo Village", location:"Visakhapatnam Region",
    latitude:17.72, longitude:83.30, population:1240, riskScore:87, riskLevel:"Red", priority:"Immediate",
    hazards:{flood:90, landslide:80, coastal:20, cloudburst:60},
    disasterHistory:[
      {id:"D001",type:"Flood",year:2024,severity:"High",description:"Severe flooding affected residential areas and road connectivity."},
      {id:"D002",type:"Landslide",year:2025,severity:"Severe",description:"Slope failure disrupted access routes and damaged properties."},
      {id:"D003",type:"Flood",year:2026,severity:"High",description:"Recurring flood event affected low-lying habitation areas."}
    ]
  },
  {
    id:"H002", name:"Coastal Hamlet", location:"Coastal Region",
    latitude:17.69, longitude:83.32, population:860, riskScore:78, riskLevel:"High", priority:"Immediate",
    hazards:{flood:75, landslide:20, coastal:92, cloudburst:55},
    disasterHistory:[
      {id:"D004",type:"Coastal Erosion",year:2024,severity:"Severe",description:"Progressive shoreline erosion affected houses and infrastructure."},
      {id:"D005",type:"Flood",year:2025,severity:"High",description:"Coastal flooding affected access roads and agricultural land."}
    ]
  },
  {
    id:"H003", name:"Hill Settlement", location:"Eastern Ghats",
    latitude:17.79, longitude:83.31, population:540, riskScore:68, riskLevel:"High", priority:"Short-term",
    hazards:{flood:45, landslide:88, coastal:10, cloudburst:72},
    disasterHistory:[
      {id:"D006",type:"Landslide",year:2023,severity:"High",description:"Slope instability blocked the primary access road."},
      {id:"D007",type:"Cloudburst",year:2025,severity:"High",description:"Intense rainfall triggered debris movement."}
    ]
  },
  {
    id:"H004", name:"River Side Colony", location:"River Basin",
    latitude:17.74, longitude:83.28, population:1120, riskScore:52, riskLevel:"Moderate", priority:"Medium-term",
    hazards:{flood:70, landslide:30, coastal:15, cloudburst:50},
    disasterHistory:[
      {id:"D008",type:"Flood",year:2024,severity:"Moderate",description:"River overflow temporarily inundated low-lying homes."}
    ]
  },
  {
    id:"H005", name:"Safe Valley", location:"Inland Region",
    latitude:17.68, longitude:83.25, population:730, riskScore:31, riskLevel:"Low", priority:"Medium-term",
    hazards:{flood:25, landslide:20, coastal:5, cloudburst:30},
    disasterHistory:[
      {id:"D009",type:"Cloudburst",year:2022,severity:"Moderate",description:"Short-duration intense rainfall caused minor drainage issues."}
    ]
  }
];

export const relocationSites: RelocationSite[] = [
  {
    id:"R001", name:"Safe Site A", latitude:17.76, longitude:83.34, capacity:1500, distance:8, suitabilityScore:92,
    suitability:{safety:96,capacity:88,accessibility:94,facilities:90,distance:92},
    facilities:{hospital:"3.2 km",school:"1.8 km",roadAccess:"Excellent",water:"Available",electricity:"Available"}
  },
  {
    id:"R002", name:"Community Ground B", latitude:17.74, longitude:83.37, capacity:2200, distance:11, suitabilityScore:86,
    suitability:{safety:90,capacity:96,accessibility:82,facilities:84,distance:78},
    facilities:{hospital:"4.5 km",school:"2.1 km",roadAccess:"Good",water:"Available",electricity:"Available"}
  },
  {
    id:"R003", name:"Hilltop Settlement C", latitude:17.79, longitude:83.31, capacity:900, distance:14, suitabilityScore:78,
    suitability:{safety:82,capacity:70,accessibility:76,facilities:82,distance:80},
    facilities:{hospital:"6.2 km",school:"1.5 km",roadAccess:"Good",water:"Available",electricity:"Available"}
  },
  {
    id:"R004", name:"Relief Campus D", latitude:17.71, longitude:83.35, capacity:1200, distance:6, suitabilityScore:71,
    suitability:{safety:72,capacity:78,accessibility:92,facilities:80,distance:82},
    facilities:{hospital:"2.8 km",school:"0.9 km",roadAccess:"Excellent",water:"Available",electricity:"Available"}
  }
];

export const redZoneData = {
  type:"FeatureCollection",
  features:[
    {type:"Feature",properties:{id:"Z001",name:"High Risk Zone A",riskScore:92},geometry:{type:"Polygon",coordinates:[[[83.20,17.70],[83.25,17.70],[83.25,17.75],[83.20,17.75],[83.20,17.70]]]}},
    {type:"Feature",properties:{id:"Z002",name:"High Risk Zone B",riskScore:86},geometry:{type:"Polygon",coordinates:[[[83.29,17.77],[83.34,17.77],[83.34,17.82],[83.29,17.82],[83.29,17.77]]]}}
  ]
};

export const getRiskColor = (level: RiskLevel) =>
  ({Red:"#dc2626",High:"#f97316",Moderate:"#eab308",Low:"#16a34a"}[level]);

export const getPriorityColor = (p: RelocationPriority) =>
  ({Immediate:"#dc2626","Short-term":"#f97316","Medium-term":"#2563eb"}[p]);
