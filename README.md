# GIS + Relocation Module (Member 2)

React + Vite + TypeScript module for the SIH disaster-resilience platform.
Covers: Hazard Map, Habitations, Relocation Sites, Relocation Plan.
No backend — all data is local mock data in `src/data/mockData.ts`.

## Run locally

```bash
npm install
npm run dev
```

Open the printed local URL (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Stack

- React + Vite + TypeScript
- MapLibre GL JS (Esri World Imagery satellite tiles, no API key needed)
- Lucide React (icons)
- Recharts (suitability radar chart, relocation progress bar chart)

## Structure

```
src/
  components/   Sidebar, PageHeader, RiskBadge, HazardBars, LayersPanel,
                MapLegend, SuitabilityRadar
  data/         mockData.ts — habitations, relocation sites, relocation plan
  pages/        HazardMap, Habitations, RelocationSites, RelocationPlan
  mapStyle.ts   Esri satellite raster style spec
  popupContent.ts  HTML builders for map popups
  types.ts      Shared TypeScript types
  utils.ts      Risk/status color + formatting helpers
```

## Notes

- Hazard Map opens in satellite view by default, centered on Uttarakhand.
- Habitation markers are colored by risk level (red/orange/yellow/green);
  relocation sites show as blue "R" markers. Click either for a details popup.
- The right-side Layers panel toggles hazard exposure overlays (Flood,
  Landslide, Coastal Erosion, Cloudburst), Red Zone highlighting, and
  relocation site marker visibility.
- Coastal Erosion exposure is 0 for all habitations (Himalayan/inland region),
  so toggling that layer shows no overlay — this is expected, not a bug.
