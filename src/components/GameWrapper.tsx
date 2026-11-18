import { useEffect, useRef } from "react";
import Phaser from "phaser";
import gameConfig from "../snake/config";

interface GameCanvasProps {
  width?: number;
  height?: number;
  onGameReady?: (game: Phaser.Game) => void;
}

function GameWrapper({ width, height, onGameReady }: GameCanvasProps) {
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
    gameRef.current = game;

    if (onGameReady) {
      onGameReady(game);
    }

    return () => {
      game.destroy(true);
      gameRef.current = null;
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width, height }} className="mx-auto" />
  );
}

export default GameWrapper;
