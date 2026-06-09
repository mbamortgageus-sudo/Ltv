"use client";

import { useEffect, useState } from "react";

export default function MouseGame() {
  const [mousePos, setMousePos] = useState({ x: 200, y: 200 });
  const [catPos, setCatPos] = useState({ x: 50, y: 50 });
  const [score, setScore] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (!playing) return;

    const moveMouse = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", moveMouse);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
    };
  }, [playing]);

  useEffect(() => {
    if (!playing) return;

    const timer = setInterval(() => {
      setScore((s) => s + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [playing]);

  useEffect(() => {
    if (!playing) return;

    const chase = setInterval(() => {
      setCatPos((cat) => {
        const dx = mousePos.x - cat.x;
        const dy = mousePos.y - cat.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 40) {
          setPlaying(false);
          setGameOver(true);
        }

        return {
          x: cat.x + dx * 0.08,
          y: cat.y + dy * 0.08,
        };
      });
    }, 30);

    return () => clearInterval(chase);
  }, [mousePos, playing]);

  const startGame = () => {
    setScore(0);
    setGameOver(false);
    setPlaying(true);
    setCatPos({ x: 50, y: 50 });
  };

  return (
    <main
      style={{
        background: "#000",
        color: "#fff",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          paddingTop: "20px",
          color: "#00d4ff",
        }}
      >
        Aladdine Mouse vs Cat
      </h1>

      <div
        style={{
          textAlign: "center",
          fontSize: "24px",
          marginTop: "10px",
        }}
      >
        Score: {score}
      </div>

      {!playing && !gameOver && (
        <div
          style={{
            textAlign: "center",
            marginTop: "30px",
          }}
        >
          <button
            onClick={startGame}
            style={{
              padding: "12px 24px",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            Start Game
          </button>
        </div>
      )}

      {gameOver && (
        <div
          style={{
            textAlign: "center",
            marginTop: "30px",
          }}
        >
          <h2>Game Over!</h2>
          <p>Your Score: {score}</p>

          <button
            onClick={startGame}
            style={{
              padding: "12px 24px",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            Play Again
          </button>
        </div>
      )}

      {playing && (
        <>
          <div
            style={{
              position: "absolute",
              left: mousePos.x - 20,
              top: mousePos.y - 20,
              fontSize: "40px",
            }}
          >
            🐭
          </div>

          <div
            style={{
              position: "absolute",
              left: catPos.x,
              top: catPos.y,
              fontSize: "50px",
            }}
          >
            🐱
          </div>
        </>
      )}
    </main>
  );
}