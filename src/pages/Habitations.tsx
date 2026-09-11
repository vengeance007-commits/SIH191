import { useEffect, useState } from "react";
import {
  Search,
  MapPin,
  Users,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { habitations as mockHabitations } from "../data/mockData";

interface Habitation {
  id: string;
  name: string;
  location: string;
  population: number;
  riskScore: number;
  riskLevel: "Red" | "High" | "Moderate" | "Low";
  priority: "Immediate" | "Short-term" | "Medium-term";
}

const Habitations = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Habitation | null>(null);

  // Start with mock data so the page never becomes blank
  const [data, setData] = useState<Habitation[]>(
    mockHabitations as Habitation[]
  );

  useEffect(() => {
    const fetchHabitations = async () => {
      const { data: supabaseData, error } = await supabase
        .from("habitations")
        .select("*");

      if (error) {
        console.error("Error fetching habitations:", error);
        return;
      }

      console.log("SUPABASE DATA:", supabaseData);

      // Only replace mock data when Supabase actually returns rows
      if (supabaseData && supabaseData.length > 0) {
        setData(supabaseData as Habitation[]);
      }
    };

    fetchHabitations();
  }, []);

  const filteredHabitations = data.filter((habitation) => {
    const searchText = search.toLowerCase();

    return (
      habitation.name.toLowerCase().includes(searchText) ||
      habitation.location.toLowerCase().includes(searchText)
    );
  });

  const getRiskColor = (
    level: Habitation["riskLevel"]
  ): string => {
    switch (level) {
      case "Red":
        return "#dc2626";
      case "High":
        return "#f97316";
      case "Moderate":
        return "#eab308";
      case "Low":
        return "#16a34a";
      default:
        return "#6b7280";
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        padding: "24px",
        fontFamily: "Arial, sans-serif",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "20px" }}>
        <h1
          style={{
            margin: 0,
            fontSize: "24px",
            fontWeight: 800,
            color: "#111827",
          }}
        >
          Vulnerable Habitations
        </h1>

        <p
          style={{
            margin: "6px 0 0",
            fontSize: "13px",
            color: "#6b7280",
          }}
        >
          Identify and prioritize habitations exposed to
          multi-hazard risk.
        </p>
      </div>

      {/* Search */}
      <div
        style={{
          position: "relative",
          maxWidth: "500px",
          marginBottom: "20px",
        }}
      >
        <Search
          size={17}
          style={{
            position: "absolute",
            left: "12px",
            top: "12px",
            color: "#9ca3af",
          }}
        />

        <input
          type="text"
          placeholder="Search habitation or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            height: "42px",
            padding: "0 14px 0 38px",
            boxSizing: "border-box",
            border: "1px solid #d1d5db",
            borderRadius: "9px",
            outline: "none",
            fontSize: "13px",
            background: "#ffffff",
          }}
        />
      </div>

      {/* Habitation Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "16px",
        }}
      >
        {filteredHabitations.map((habitation) => {
          const riskColor = getRiskColor(
            habitation.riskLevel
          );

          return (
            <div
              key={habitation.id}
              style={{
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "14px",
                padding: "18px",
                boxShadow:
                  "0 3px 12px rgba(0, 0, 0, 0.05)",
              }}
            >
              {/* Name */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                    }}
                  >
                    <MapPin size={17} color="#2563eb" />

                    <span
                      style={{
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "#111827",
                      }}
                    >
                      {habitation.name}
                    </span>
                  </div>

                  <div
                    style={{
                      marginTop: "5px",
                      marginLeft: "24px",
                      fontSize: "11px",
                      color: "#6b7280",
                    }}
                  >
                    {habitation.location}
                  </div>
                </div>

                {/* Risk */}
                <span
                  style={{
                    height: "fit-content",
                    padding: "5px 8px",
                    borderRadius: "20px",
                    background: `${riskColor}18`,
                    color: riskColor,
                    fontSize: "10px",
                    fontWeight: 700,
                  }}
                >
                  {habitation.riskLevel}
                </span>
              </div>

              {/* Stats */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                  marginTop: "18px",
                }}
              >
                <div
                  style={{
                    padding: "11px",
                    background: "#f9fafb",
                    borderRadius: "8px",
                  }}
                >
                  <Users size={16} color="#2563eb" />

                  <div
                    style={{
                      marginTop: "5px",
                      fontSize: "17px",
                      fontWeight: 700,
                    }}
                  >
                    {habitation.population.toLocaleString()}
                  </div>

                  <div
                    style={{
                      fontSize: "10px",
                      color: "#6b7280",
                    }}
                  >
                    Population
                  </div>
                </div>

                <div
                  style={{
                    padding: "11px",
                    background: "#f9fafb",
                    borderRadius: "8px",
                  }}
                >
                  <ShieldAlert
                    size={16}
                    color={riskColor}
                  />

                  <div
                    style={{
                      marginTop: "5px",
                      fontSize: "17px",
                      fontWeight: 700,
                      color: riskColor,
                    }}
                  >
                    {habitation.riskScore}
                  </div>

                  <div
                    style={{
                      fontSize: "10px",
                      color: "#6b7280",
                    }}
                  >
                    Risk Score
                  </div>
                </div>
              </div>

              {/* Priority */}
              <div
                style={{
                  marginTop: "12px",
                  padding: "9px 11px",
                  borderRadius: "8px",
                  background:
                    habitation.priority === "Immediate"
                      ? "#fef2f2"
                      : "#f9fafb",
                  fontSize: "11px",
                  color:
                    habitation.priority === "Immediate"
                      ? "#991b1b"
                      : "#4b5563",
                }}
              >
                Relocation Priority:{" "}
                <strong>{habitation.priority}</strong>
              </div>

              {/* Button */}
              <button
                onClick={() => setSelected(habitation)}
                style={{
                  width: "100%",
                  marginTop: "14px",
                  padding: "10px",
                  border: "none",
                  borderRadius: "8px",
                  background: "#111827",
                  color: "#ffffff",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "7px",
                  fontSize: "12px",
                  fontWeight: 700,
                }}
              >
                View Details
                <ArrowRight size={14} />
              </button>
            </div>
          );
        })}
      </div>

      {/* No Results */}
      {filteredHabitations.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            color: "#6b7280",
          }}
        >
          No habitations found.
        </div>
      )}

      {/* Selected Habitation */}
      {selected && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
          }}
          onClick={() => setSelected(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "90%",
              maxWidth: "420px",
              background: "#ffffff",
              borderRadius: "14px",
              padding: "24px",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "19px",
                color: "#111827",
              }}
            >
              {selected.name}
            </h2>

            <p
              style={{
                fontSize: "12px",
                color: "#6b7280",
              }}
            >
              {selected.location}
            </p>

            <div
              style={{
                marginTop: "16px",
                display: "grid",
                gap: "10px",
              }}
            >
              <div>
                Population:{" "}
                <strong>{selected.population}</strong>
              </div>

              <div>
                Risk Score:{" "}
                <strong>{selected.riskScore}/100</strong>
              </div>

              <div>
                Risk Level:{" "}
                <strong>{selected.riskLevel}</strong>
              </div>

              <div>
                Priority:{" "}
                <strong>{selected.priority}</strong>
              </div>
            </div>

            <button
              onClick={() => setSelected(null)}
              style={{
                marginTop: "20px",
                width: "100%",
                padding: "10px",
                border: "none",
                borderRadius: "8px",
                background: "#111827",
                color: "#ffffff",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Habitations;