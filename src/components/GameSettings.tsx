import { useEffect, useState } from "react";

type GameSettingsProps = {
  eventEmitter: Phaser.Events.EventEmitter;
};

function GameSettings({ eventEmitter }: GameSettingsProps) {
  const [score, setScore] = useState(0);

  useEffect(() => {
    const onScoreUpdate = (data: { score: number }) => {
      setScore(data.score);
    };

    eventEmitter.on("scoreUpdate", onScoreUpdate);

    return () => {
      eventEmitter.off("scoreUpdate", onScoreUpdate);
    };
  }, []);

  return (
    <div className="border-2 border-zinc-500 min-w-md mb-4 text-center">
      <h1 className="text-2xl">SNAKE</h1>
      <p>{score}</p>
      <button onClick={() => console.log("TODO restart")}>Restart</button>
    </div>
  );
}

export default GameSettings;
