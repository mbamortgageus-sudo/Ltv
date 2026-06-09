"use client";

import { useEffect, useState } from "react";

export default function GTAGame() {
  const [player, setPlayer] = useState({
    x: 500,
    y: 500,
  });

  useEffect(() => {
    const keys: Record<string, boolean> = {};

    const down = (e: KeyboardEvent) => {
      keys[e.key.toLowerCase()] = true;
    };

    const up = (e: KeyboardEvent) => {
      keys[e.key.toLowerCase()] = false;
    };

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    const gameLoop = setInterval(() => {
      setPlayer((p) => {
        let x = p.x;
        let y = p.y;
        const speed = 5;

        if (keys["w"]) y -= speed;
        if (keys["s"]) y += speed;
        if (keys["a"]) x -= speed;
        if (keys["d"]) x += speed;

        return { x, y };
      });
    }, 16);

    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      clearInterval(gameLoop);
    };
  }, []);

  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#111",
      }}
    >
      <div
        style={{
          position: "fixed",
          top: 10,
          left: 10,
          color: "white",
          zIndex: 999,
          fontSize: "20px",
        }}
      >
        💰 $1000
        <br />
        ❤️ 100
      </div>

      <div
        style={{
          position: "absolute",
          width: "3000px",
          height: "3000px",
          background: "#2a2a2a",
          transform: `translate(${-player.x + window.innerWidth / 2}px, ${-player.y + window.innerHeight / 2}px)`,
        }}
      >
        {/* Roads */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 400,
            width: "3000px",
            height: "100px",
            background: "#444",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: 700,
            top: 0,
            width: "100px",
            height: "3000px",
            background: "#444",
          }}
        />

        {/* Buildings */}
        <div
          style={{
            position: "absolute",
            left: 200,
            top: 200,
            width: "200px",
            height: "200px",
            background: "#666",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: 1000,
            top: 700,
            width: "300px",
            height: "250px",
            background: "#666",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: 1600,
            top: 1200,
            width: "250px",
            height: "250px",
            background: "#666",
          }}
        />

        {/* Player */}
        <div
          style={{
            position: "absolute",
            left: player.x,
            top: player.y,
            width: "40px",
            height: "40px",
            background: "#00d4ff",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    </main>
  );
}