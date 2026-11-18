import Phaser from "phaser";

const eventBridge = new Phaser.Events.EventEmitter();

const GameEvents = {
  // React -> Phaser
  RESTART_GAME: "restart-game",
  // Phaser -> React
  SCORE_UPDATE: "score-changed",
  SCENE_READY: "scene-ready",
} as const;

export { eventBridge, GameEvents };
