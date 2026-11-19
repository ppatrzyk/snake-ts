import { useEffect, useRef } from "react";
import Phaser from "phaser";
import gameConfig from "../snake/config";

type PhaserWrapperProps = {
  width: number;
  height: number;
  speed: number;
  eventEmitter: Phaser.Events.EventEmitter;
};

function PhaserWrapper({
  width,
  height,
  speed,
  eventEmitter,
}: PhaserWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (gameRef.current) return;

    const config: Phaser.Types.Core.GameConfig = {
      ...gameConfig,
      width,
      height,
      parent: containerRef.current!,
    };

    const game = new Phaser.Game(config);
    game.eventEmitter = eventEmitter;
    game.speed = speed;
    gameRef.current = game;

    const onGameStarted = () => {
      containerRef.current?.focus();
    };
    eventEmitter.on("gameStarted", onGameStarted);

    return () => {
      eventEmitter.off("gameStarted", onGameStarted);
      game.destroy(true);
      gameRef.current = null;
    };
  }, [width, height, eventEmitter]);

  return (
    <div className="border-2 border-zinc-500 bg-zinc-500">
      <div
        ref={containerRef}
        style={{ width, height }}
        className="mx-auto"
        tabIndex={-1}
      />
    </div>
  );
}

export default PhaserWrapper;
