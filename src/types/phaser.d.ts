import Phaser from "phaser";

declare module "phaser" {
  interface Game {
    eventEmitter: Phaser.Events.EventEmitter;
  }
}
