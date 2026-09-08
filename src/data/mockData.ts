export type RiskLevel = "Low" | "Moderate" | "High" | "Critical";

export interface Habitation {
  id: string;
  name: string;
  district: string;
  population: number;
  riskScore: number;
  riskLevel: RiskLevel;
  primaryHazard: string;
  relocationPriority: "Immediate" | "Short-term" | "Medium-term";
}

export interface RelocationSite {
  id: string;
  name: string;
  capacity: number;
  currentOccupancy: number;
  safetyScore: number;
  accessibilityScore: number;
  distanceKm: number;
  nearestHospitalKm: number;
  nearestSchoolKm: number;
}

export const habitations: Habitation[] = [
  {
    id: "H001",
    name: "Village A",
    district: "District 1",
    population: 820,
    riskScore: 87,
    riskLevel: "Critical",
    primaryHazard: "Landslide",
    relocationPriority: "Immediate",
  },
  {
    id: "H002",
    name: "Village B",
    district: "District 1",
    population: 640,
    riskScore: 74,
    riskLevel: "High",
    primaryHazard: "Flood",
    relocationPriority: "Short-term",
  },
  {
    id: "H003",
    name: "Village C",
    district: "District 1",
    population: 420,
    riskScore: 58,
    riskLevel: "Moderate",
    primaryHazard: "Landslide",
    relocationPriority: "Medium-term",
  },
  {
    id: "H004",
    name: "Village D",
    district: "District 1",
    population: 300,
    riskScore: 32,
    riskLevel: "Low",
    primaryHazard: "Flood",
    relocationPriority: "Medium-term",
  },
];

export const relocationSites: RelocationSite[] = [
  {
    id: "S001",
    name: "Candidate Site A",
    capacity: 600,
    currentOccupancy: 390,
    safetyScore: 91,
    accessibilityScore: 83,
    distanceKm: 4.8,
    nearestHospitalKm: 3.2,
    nearestSchoolKm: 1.7,
  },
  {
    id: "S002",
    name: "Candidate Site B",
    capacity: 1000,
    currentOccupancy: 520,
    safetyScore: 96,
    accessibilityScore: 89,
    distanceKm: 7.2,
    nearestHospitalKm: 2.1,
    nearestSchoolKm: 1.2,
  },
  {
    id: "S003",
    name: "Candidate Site C",
    capacity: 900,
    currentOccupancy: 720,
    safetyScore: 88,
    accessibilityScore: 79,
    distanceKm: 12.1,
    nearestHospitalKm: 5.4,
    nearestSchoolKm: 2.8,
  },
];

export const hazardDistribution = [
  { name: "Landslide", value: 82 },
  { name: "Flood", value: 65 },
  { name: "Cloudburst", value: 18 },
  { name: "Coastal Erosion", value: 12 },
];

export const relocationPriority = [
  { name: "Immediate", value: 43 },
  { name: "Short-term", value: 72 },
  { name: "Medium-term", value: 105 },
];

export const recentAlerts = [
  {
    id: 1,
    title: "High landslide risk detected",
    location: "Village A",
    time: "12 min ago",
    severity: "Critical",
  },
  {
    id: 2,
    title: "Flood exposure increased",
    location: "Village B",
    time: "34 min ago",
    severity: "High",
  },
  {
    id: 3,
    title: "Relocation site capacity updated",
    location: "Candidate Site B",
    time: "1 hr ago",
    severity: "Info",
  },
];