"use client";

import { useEffect, useState } from "react";

export default function USATimeMap() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getTime = (timezone: string) => {
    return now.toLocaleTimeString("en-US", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const zones = [
    {
      short: "PST",
      full: "Pacific Standard Time",
      timezone: "America/Los_Angeles",
      color: "#3b82f6",
      top: "52%",
      left: "15%",
      states: [
        "CA - California",
        "OR - Oregon",
        "WA - Washington",
        "NV - Nevada",
      ],
    },
    {
      short: "MST",
      full: "Mountain Standard Time",
      timezone: "America/Denver",
      color: "#22c55e",
      top: "48%",
      left: "35%",
      states: [
        "AZ - Arizona",
        "CO - Colorado",
        "ID - Idaho",
        "MT - Montana",
        "NM - New Mexico",
        "UT - Utah",
        "WY - Wyoming",
      ],
    },
    {
      short: "CST",
      full: "Central Standard Time",
      timezone: "America/Chicago",
      color: "#eab308",
      top: "55%",
      left: "55%",
      states: [
        "AL - Alabama",
        "AR - Arkansas",
        "IA - Iowa",
        "IL - Illinois",
        "KS - Kansas",
        "LA - Louisiana",
        "MN - Minnesota",
        "MO - Missouri",
        "MS - Mississippi",
        "ND - North Dakota",
        "NE - Nebraska",
        "OK - Oklahoma",
        "SD - South Dakota",
        "TN - Tennessee",
        "TX - Texas",
        "WI - Wisconsin",
      ],
    },
    {
      short: "EST",
      full: "Eastern Standard Time",
      timezone: "America/New_York",
      color: "#ef4444",
      top: "45%",
      left: "82%",
      states: [
        "CT - Connecticut",
        "DE - Delaware",
        "FL - Florida",
        "GA - Georgia",
        "IN - Indiana",
        "KY - Kentucky",
        "MA - Massachusetts",
        "MD - Maryland",
        "ME - Maine",
        "MI - Michigan",
        "NC - North Carolina",
        "NH - New Hampshire",
        "NJ - New Jersey",
        "NY - New York",
        "OH - Ohio",
        "PA - Pennsylvania",
        "RI - Rhode Island",
        "SC - South Carolina",
        "VA - Virginia",
        "VT - Vermont",
        "WV - West Virginia",
      ],
    },
    {
      short: "AKST",
      full: "Alaska Standard Time",
      timezone: "America/Anchorage",
      color: "#8b5cf6",
      top: "85%",
      left: "10%",
      states: ["AK - Alaska"],
    },
    {
      short: "HST",
      full: "Hawaii Standard Time",
      timezone: "Pacific/Honolulu",
      color: "#f97316",
      top: "92%",
      left: "25%",
      states: ["HI - Hawaii"],
    },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          borderBottom: "1px solid #222",
        }}
      >
        <h1
          style={{
            color: "#00d4ff",
            fontSize: "42px",
            marginBottom: "10px",
          }}
        >
          Aladdine USA Time Zones
        </h1>

        <p>Live United States Time Zone Map</p>
      </div>

      <div
        style={{
          position: "relative",
          height: "85vh",
          backgroundImage:
            "url('https://upload.wikimedia.org/wikipedia/commons/a/a5/Map_of_USA_with_state_names.svg')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {zones.map((zone) => (
          <div
            key={zone.short}
            style={{
              position: "absolute",
              top: zone.top,
              left: zone.left,
              transform: "translate(-50%, -50%)",
              background: "rgba(0,0,0,0.85)",
              border: `2px solid ${zone.color}`,
              borderRadius: "12px",
              padding: "10px",
              minWidth: "220px",
              textAlign: "center",
              boxShadow: `0 0 20px ${zone.color}`,
            }}
          >
            <div
              style={{
                color: zone.color,
                fontSize: "28px",
                fontWeight: "bold",
              }}
            >
              {zone.short}
            </div>

            <div
              style={{
                color: "#ddd",
                fontSize: "13px",
                marginBottom: "8px",
              }}
            >
              {zone.full}
            </div>

            <div
              style={{
                fontSize: "22px",
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              {getTime(zone.timezone)}
            </div>

            <div
              style={{
                marginTop: "10px",
                textAlign: "left",
                fontSize: "11px",
                color: "#ccc",
                maxHeight: "180px",
                overflowY: "auto",
              }}
            >
              {zone.states.map((state) => (
                <div key={state}>{state}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}