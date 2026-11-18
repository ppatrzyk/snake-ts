import { useEffect, useRef } from "react";
import Phaser from "phaser";
import gameConfig from "../snake/config";

type GameWrapperProps = {
  width?: number;
  height?: number;
  eventEmitter: Phaser.Events.EventEmitter;
};

function GameWrapper({ width, height, eventEmitter }: GameWrapperProps) {
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
    gameRef.current = game;

    return () => {
      game.destroy(true);
      gameRef.current = null;
    };
  }, [width, height]);

  return (
    <div className="border-2 border-zinc-500">
      <div ref={containerRef} style={{ width, height }} className="mx-auto" />
    </div>
  );
}

export default GameWrapper;
