import { useEffect, useState } from "react";
import { eventBridge, GameEvents } from "../snake/EventBridge";

function GameSettings() {
  const [score, setScore] = useState(0);

  useEffect(() => {
    const onScoreUpdate = (data: { score: number }) => {
      setScore(data.score);
    };

    eventBridge.on(GameEvents.SCORE_UPDATE, onScoreUpdate);

    return () => {
      eventBridge.off(GameEvents.SCORE_UPDATE, onScoreUpdate);
    };
  }, []);

  return (
    <div className="border-2 border-zinc-500 min-w-md mb-4 text-center">
      <h1 className="text-2xl">SNAKE</h1>
      <p>{score}</p>
      <button onClick={() => eventBridge.emit(GameEvents.RESTART_GAME)}>
        Restart
      </button>
    </div>
  );
}

export default GameSettings;
