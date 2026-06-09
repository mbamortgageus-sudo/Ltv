"use client";

import { useMemo, useState } from "react";

export default function LTVCalculator() {
  const [propertyValue, setPropertyValue] = useState("");
  const [loanAmount, setLoanAmount] = useState("");

  const ltv = useMemo(() => {
    const property = Number(propertyValue);
    const loan = Number(loanAmount);

    if (!property || property <= 0 || !loan) return null;

    return (loan / property) * 100;
  }, [propertyValue, loanAmount]);

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          border: "1px solid #333",
          borderRadius: "16px",
          padding: "30px",
          backgroundColor: "#111",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#4400fd",
            marginBottom: "10px",
            fontSize: "60px",
          }}
        >
          Aladdine
        </h2>

        <h1
          style={{
            textAlign: "center",
            fontSize: "32px",
            marginBottom: "30px",
          }}
        >
          Loan-to-Value Calculator
        </h1>

        <input
          type="number"
          placeholder="Property Value"
          value={propertyValue}
          onChange={(e) => setPropertyValue(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            backgroundColor: "#222",
            color: "#fff",
            border: "1px solid #444",
            borderRadius: "8px",
          }}
        />

        <input
          type="number"
          placeholder="Loan Amount"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            backgroundColor: "#222",
            color: "#fff",
            border: "1px solid #444",
            borderRadius: "8px",
          }}
        />

        {ltv !== null && (
          <div
            style={{
              textAlign: "center",
              padding: "20px",
              backgroundColor: "#1a1a1a",
              borderRadius: "10px",
            }}
          >
            <p style={{ color: "#aaa" }}>Loan-to-Value Ratio</p>

            <h2
              style={{
                fontSize: "48px",
                color: "#00ff88",
                margin: "10px 0",
              }}
            >
              {ltv.toFixed(2)}%
            </h2>
          </div>
        )}
      </div>
    </main>
  );
}