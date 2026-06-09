"use client";

import { useEffect, useState } from "react";

export default function AimTrainer() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [playing, setPlaying] = useState(false);
  const [highScore, setHighScore] = useState(0);

  const [target, setTarget] = useState({
    x: 200,
    y: 200,
  });

  const [size, setSize] = useState(80);

  useEffect(() => {
    if (!playing) return;

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setPlaying(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [playing]);

  const randomTarget = () => {
    setTarget({
      x: Math.random() * (window.innerWidth - 120),
      y: Math.random() * (window.innerHeight - 180) + 100,
    });
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setSize(80);
    setPlaying(true);
    randomTarget();
  };

  const hitTarget = () => {
    if (!playing) return;

    const newScore = score + 1;

    setScore(newScore);

    if (newScore > highScore) {
      setHighScore(newScore);
    }

    setSize((s) => Math.max(25, s - 2));

    randomTarget();
  };

  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        background: "#000",
        color: "#fff",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          textAlign: "center",
          paddingTop: "20px",
        }}
      >
        <h1
          style={{
            color: "#00d4ff",
            fontSize: "40px",
          }}
        >
          Aladdine Aim Trainer
        </h1>

        <div style={{ fontSize: "24px" }}>
          Score: {score}
        </div>

        <div style={{ fontSize: "24px" }}>
          High Score: {highScore}
        </div>

        <div style={{ fontSize: "24px" }}>
          Time: {timeLeft}s
        </div>

        {!playing && (
          <button
            onClick={startGame}
            style={{
              marginTop: "20px",
              padding: "12px 24px",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            Start Game
          </button>
        )}
      </div>

      {playing && (
        <div
          onClick={hitTarget}
          style={{
            position: "absolute",
            left: target.x,
            top: target.y,
            width: size,
            height: size,
            borderRadius: "50%",
            background: "red",
            cursor: "pointer",
            border: "4px solid white",
          }}
        />
      )}
    </main>
  );
}