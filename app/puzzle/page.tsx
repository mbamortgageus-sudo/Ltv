"use client";

import { useEffect, useState } from "react";

export default function PuzzleGame() {
  const [tiles, setTiles] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [won, setWon] = useState(false);

  useEffect(() => {
    shuffle();
  }, []);

  useEffect(() => {
    if (won) return;

    const timer = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [won]);

  const shuffle = () => {
    const arr = [...Array(15).keys()].map((n) => n + 1);
    arr.push(0);

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    setTiles(arr);
    setMoves(0);
    setSeconds(0);
    setWon(false);
  };

  const moveTile = (index: number) => {
    const empty = tiles.indexOf(0);

    const valid =
      empty === index - 1 ||
      empty === index + 1 ||
      empty === index - 4 ||
      empty === index + 4;

    if (!valid) return;

    const newTiles = [...tiles];
    [newTiles[index], newTiles[empty]] = [
      newTiles[empty],
      newTiles[index],
    ];

    setTiles(newTiles);
    setMoves((m) => m + 1);

    const solved = [
      1, 2, 3, 4,
      5, 6, 7, 8,
      9,10,11,12,
      13,14,15,0
    ];

    if (JSON.stringify(newTiles) === JSON.stringify(solved)) {
      setWon(true);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "30px",
      }}
    >
      <h1
        style={{
          color: "#ff0000",
          marginBottom: "10px",
        }}
      >
        Aladdine Puzzle Game
      </h1>

      <div style={{ marginBottom: "15px" }}>
        Moves: {moves} | Time: {seconds}s
      </div>

      <button
        onClick={shuffle}
        style={{
          padding: "10px 20px",
          marginBottom: "20px",
          cursor: "pointer",
        }}
      >
        Shuffle
      </button>

      {won && (
        <h2 style={{ color: "#22c55e" }}>
          🎉 Puzzle Solved!
        </h2>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 80px)",
          gap: "6px",
        }}
      >
        {tiles.map((tile, index) => (
          <button
            key={index}
            onClick={() => moveTile(index)}
            style={{
              width: "80px",
              height: "80px",
              fontSize: "24px",
              fontWeight: "bold",
              border: "none",
              borderRadius: "8px",
              cursor: tile ? "pointer" : "default",
              background: tile ? "#00d4ff" : "#111",
              color: tile ? "#000" : "#111",
            }}
          >
            {tile || ""}
          </button>
        ))}
      </div>
    </main>
  );
}