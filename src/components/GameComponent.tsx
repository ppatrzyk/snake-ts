import { useCallback, useEffect, useMemo, useState } from "react";

import PhaserWrapper from "./PhaserWrapper";
import Phaser from "phaser";
import { STEP_SIZE } from "../snake/scenes/Game";

function GameComponent() {
  const defaultMapSize = 24;

  const [score, setScore] = useState(0);
  const [mapSize, setMapSize] = useState(defaultMapSize);
  const [mapSizePx, setMapSizePx] = useState(STEP_SIZE * mapSize); // this should not be reactive, set only on explicit restart
  const [gameKey, setGameKey] = useState(crypto.randomUUID());

  const eventEmitter = useMemo(() => new Phaser.Events.EventEmitter(), []);

  useEffect(() => {
    const onScoreUpdate = (data: { score: number }) => {
      setScore(data.score);
    };

    eventEmitter.on("scoreUpdate", onScoreUpdate);

    return () => {
      eventEmitter.off("scoreUpdate", onScoreUpdate);
    };
  }, [eventEmitter.on, eventEmitter.off]);

  return (
    <div>
      <div className="border-2 border-zinc-500 min-w-md mb-4 p-2 text-center">
        <h1 className="text-2xl">SNAKE</h1>
        <input
          type="range"
          min={8}
          max={24}
          value={mapSize}
          onChange={(event) => setMapSize(event.target.valueAsNumber)}
        />
        <p>
          Value: {mapSize}, {mapSizePx}
        </p>
        <p>Score: {score}</p>
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
