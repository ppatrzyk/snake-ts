import { useEffect, useMemo, useState } from "react";

import PhaserWrapper from "./PhaserWrapper";
import Phaser from "phaser";
import { STEP_SIZE } from "../snake/scenes/Game";

function GameComponent() {
  const defaultMapSize = 24;

  const [gameRunning, setGameRunning] = useState(false);
  const [score, setScore] = useState(1);
  const [pastScores, setPastScores] = useState<number[]>([]);
  const [mapSize, setMapSize] = useState(defaultMapSize);
  const [mapSizePx, setMapSizePx] = useState(STEP_SIZE * mapSize); // this should not be reactive, set only on explicit restart
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
      <div className="border-2 border-zinc-500 min-w-md mb-4 p-2 text-center">
        <h1 className="text-2xl font-bold">SNAKE</h1>
        <label>
          <span className="block">Map size: {mapSize}</span>
          <input
            type="range"
            className="h-3 appearance-none rounded-full bg-zinc-500"
            min={8}
            max={24}
            value={mapSize}
            onChange={(event) => setMapSize(event.target.valueAsNumber)}
          />
        </label>
        <p>Best score: {bestScore}</p>
        <p className={`${gameRunning ? "" : "hidden"}`}>
          Current core: {score}
        </p>
        <button
          type="button"
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
      <PhaserWrapper
        key={gameKey}
        width={mapSizePx}
        height={mapSizePx}
        eventEmitter={eventEmitter}
      />
    </div>
  );
}

export default GameComponent;
