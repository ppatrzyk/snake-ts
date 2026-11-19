import { useCallback, useEffect, useMemo, useState } from "react";

import PhaserWrapper from "./PhaserWrapper";
import Phaser from "phaser";

function GameComponent() {
  const [score, setScore] = useState(0);
  const [mapSize, setMapSize] = useState(10);

  const [gameKey, setGameKey] = useState(crypto.randomUUID());

  const eventEmitter = useMemo(() => new Phaser.Events.EventEmitter(), []);

  const handleRestart = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.blur();
      // console.log("restart handler", e.timeStamp, e.isTrusted);
      setGameKey(crypto.randomUUID());
    },
    [],
  );

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
          min={0}
          max={100}
          value={mapSize}
          onChange={(event) => setMapSize(event.target.valueAsNumber)}
        />
        <p>Value: {mapSize}</p>
        <p>Score: {score}</p>
        <p>{gameKey}</p>
        <button type="button" onClick={handleRestart}>
          Restart
        </button>
      </div>
      <PhaserWrapper
        key={gameKey}
        width={1024}
        height={768}
        eventEmitter={eventEmitter}
      />
    </div>
  );
}

export default GameComponent;
