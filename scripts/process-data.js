
import fs from "fs";
import path from "path";
import shp from "shpjs";

const ROOT = process.cwd();

const boundaryFolder = path.join(ROOT, "public", "data", "geojson");
const landslideFolder = path.join(ROOT, "datasets", "landslide");
const outputFolder = path.join(ROOT, "public", "data", "processed");

if (!fs.existsSync(outputFolder))
  fs.mkdirSync(outputFolder, { recursive: true });

function readGeoJSON(file) {
  console.log("Reading:", file);

  const text = fs.readFileSync(file, "utf8");

  if (!text.trim()) {
    throw new Error(`${file} is empty`);
  }

  return JSON.parse(text);
}

function saveGeoJSON(name, data) {
  fs.writeFileSync(
    path.join(outputFolder, name),
    JSON.stringify(data, null, 2)
  );
  console.log("Saved:", name);
}

function findNameKey(properties) {
  const keys = Object.keys(properties);

  return (
    keys.find(k => k.toLowerCase().includes("district")) ||
    keys.find(k => k.toLowerCase().includes("dist")) ||
    keys.find(k => k.toLowerCase() === "name") ||
    keys.find(k => k.toLowerCase().includes("sub_dist")) ||
    keys.find(k => k.toLowerCase().includes("taluk")) ||
    keys[0]
  );
}

const district = readGeoJSON(
  path.join(boundaryFolder, "district.geojson")
);

const districtKey = findNameKey(
  district.features[0].properties
);

const wayanadDistrict = {
  type: "FeatureCollection",
  features: district.features.filter(f =>
    String(f.properties[districtKey])
      .toLowerCase()
      .includes("wayanad")
  )
};

saveGeoJSON(
  "wayanad_district.geojson",
  wayanadDistrict
);

const taluks = readGeoJSON(
  path.join(boundaryFolder, "taluk.geojson")
);

const talukKey = findNameKey(
  taluks.features[0].properties
);

const wayanadTaluks = {
  type: "FeatureCollection",
  features: taluks.features.filter(f =>
    String(f.properties[talukKey])
      .toLowerCase()
      .includes("wayanad")
  )
};

saveGeoJSON(
  "wayanad_taluks.geojson",
  wayanadTaluks
);

const villages = readGeoJSON(
  path.join(boundaryFolder, "village.geojson")
);

const villageKey = findNameKey(
  villages.features[0].properties
);

const wayanadVillages = {
  type: "FeatureCollection",
  features: villages.features.filter(f =>
    JSON.stringify(f.properties)
      .toLowerCase()
      .includes("wayanad")
  )
};

saveGeoJSON(
  "wayanad_villages.geojson",
  wayanadVillages
);

async function convertLandslide() {
  const zipPath = path.join(
    landslideFolder,
    "Wayanad.zip"
  );

  if (!fs.existsSync(zipPath)) {
    console.log("No Wayanad.zip found.");
    return;
  }

  try {
    const buffer = fs.readFileSync(zipPath);

    const geojson = await shp(buffer);

    saveGeoJSON(
      "landslide_zones.geojson",
      geojson
    );

    console.log("Landslide converted.");
  } catch (err) {
    console.log("Landslide conversion failed.");
    console.log(err.message);
  }
}

convertLandslide();