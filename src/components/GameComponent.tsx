import { useEffect, useMemo, useState } from "react";

import PhaserWrapper from "./PhaserWrapper";
import Phaser from "phaser";
import { STEP_SIZE } from "../snake/scenes/Game";

function GameComponent() {
  const availableSizePx = Math.min(window.innerHeight, window.innerWidth);
  const defaultMaxMapSize = 24;
  const maxMapSize = Math.min(
    Math.floor(availableSizePx / 32),
    defaultMaxMapSize,
  );
  const minMapSize = 8;
  const defaultSnakeSpeed = 5;

  const [gameRunning, setGameRunning] = useState(false);
  const [score, setScore] = useState(1);
  const [pastScores, setPastScores] = useState<number[]>([]);
  const [mapSize, setMapSize] = useState(maxMapSize);
  const [mapSizePx, setMapSizePx] = useState(STEP_SIZE * mapSize); // this should not be reactive, set only on explicit restart
  const [snakeSpeed, setSnakeSpeed] = useState(defaultSnakeSpeed);
  const [gameKey, setGameKey] = useState(crypto.randomUUID());

  const bestScore = pastScores.length > 0 ? Math.max(...pastScores) : 0;

  const eventEmitter = useMemo(() => new Phaser.Events.EventEmitter(), []);

  useEffect(() => {
    const onGameFinished = (data: { score: number }) => {
      setGameRunning(false);
      setPastScores((currentPastScores) => [...currentPastScores, data.score]);
    };
    const onGameStarted = () => {
      setScore(1);
      setGameRunning(true);
    };
    const onScoreUpdate = (data: { score: number }) => {
      setScore(data.score);
    };

    eventEmitter.on("gameFinished", onGameFinished);
    eventEmitter.on("gameStarted", onGameStarted);
    eventEmitter.on("scoreUpdate", onScoreUpdate);

    return () => {
      eventEmitter.off("gameFinished", onGameFinished);
      eventEmitter.off("gameStarted", onGameStarted);
      eventEmitter.off("scoreUpdate", onScoreUpdate);
    };
  }, [eventEmitter.on, eventEmitter.off]);

  return (
    <div className="mb-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 border-2 border-zinc-500 md:min-w-md mb-4 p-2 text-center">
        <div>
          <h1 className="text-4xl font-bold m-2 bg-gradient-to-r from-emerald-300 via-snake to-emerald-500 bg-clip-text text-transparent">
            SNAKE
          </h1>

          <p>
            Best score:{" "}
            <span className="text-snake font-bold">{bestScore}</span>
          </p>
          <p className={`${gameRunning ? "" : "hidden"}`}>
            Current score: <span className="text-snake">{score}</span>
          </p>
        </div>
        <div>
          <div className="mb-2">
            <label>
              <span className="block text-sm font-semibold">
                Map size: {mapSize}
              </span>
              <input
                type="range"
                className="h-3 appearance-none rounded-full bg-zinc-500"
                min={minMapSize}
                max={maxMapSize}
                value={mapSize}
                onChange={(event) => setMapSize(event.target.valueAsNumber)}
              />
            </label>
          </div>
          <div className="mb-2">
            <label>
              <span className="block text-sm font-semibold">
                Speed: {snakeSpeed}
              </span>
              <input
                type="range"
                className="h-3 appearance-none rounded-full bg-zinc-500"
                min={1}
                max={10}
                value={snakeSpeed}
                onChange={(event) => setSnakeSpeed(event.target.valueAsNumber)}
              />
            </label>
          </div>
          <div>
            <button
              type="button"
              className="bg-zinc-500 rounded-full px-6 py-2 font-semibold"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.blur();
                // console.log("restart handler", e.timeStamp, e.isTrusted);
                setMapSizePx(STEP_SIZE * mapSize);
                setGameKey(crypto.randomUUID());
              }}
            >
              Restart
            </button>
          </div>
        </div>
      </div>
      <PhaserWrapper
        key={gameKey}
        width={mapSizePx}
        height={mapSizePx}
        speed={snakeSpeed}
        eventEmitter={eventEmitter}
      />
    </div>
  );
}

export default GameComponent;
