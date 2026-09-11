import fs from "fs";
import path from "path";

const input = path.join(process.cwd(), "public/data/processed/wayanad_villages.geojson");
const output = path.join(process.cwd(), "public/data/processed/wayanad_village_points.geojson");

const data = JSON.parse(fs.readFileSync(input, "utf8"));

// Recursively collect all coordinate pairs
function collectCoordinates(arr, points = []) {
  if (!Array.isArray(arr)) return points;

  if (
    arr.length === 2 &&
    typeof arr[0] === "number" &&
    typeof arr[1] === "number"
  ) {
    points.push(arr);
  } else {
    arr.forEach(item => collectCoordinates(item, points));
  }

  return points;
}

function centroid(geometry) {
  const pts = collectCoordinates(geometry.coordinates);

  let lng = 0;
  let lat = 0;

  pts.forEach(([x, y]) => {
    lng += x;
    lat += y;
  });

  return [lng / pts.length, lat / pts.length];
}

const features = data.features.map(feature => ({
  type: "Feature",
  properties: {
    NAME: feature.properties.NAME,
    SUB_DIST: feature.properties.SUB_DIST,
    TYPE: feature.properties.TYPE
  },
  geometry: {
    type: "Point",
    coordinates: centroid(feature.geometry)
  }
}));

fs.writeFileSync(
  output,
  JSON.stringify(
    {
      type: "FeatureCollection",
      features
    },
    null,
    2
  )
);

console.log(`✅ Created ${features.length} village centroids.`);