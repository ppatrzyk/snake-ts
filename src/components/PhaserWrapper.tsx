import { useEffect, useRef } from "react";
import Phaser from "phaser";
import gameConfig from "../snake/config";

type PhaserWrapperProps = {
  width?: number;
  height?: number;
  eventEmitter: Phaser.Events.EventEmitter;
};

function PhaserWrapper({ width, height, eventEmitter }: PhaserWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (gameRef.current) return;

    console.log(width);

    const config: Phaser.Types.Core.GameConfig = {
      ...gameConfig,
      width,
      height,
      parent: containerRef.current!,
    };

    const game = new Phaser.Game(config);
    game.eventEmitter = eventEmitter;
    gameRef.current = game;

    return () => {
      game.destroy(true);
      gameRef.current = null;
    };
  }, [width, height, eventEmitter]);

  return (
    <div className="border-2 border-zinc-500 bg-zinc-50">
      <div ref={containerRef} style={{ width, height }} className="mx-auto" />
    </div>
  );
}

export default PhaserWrapper;
