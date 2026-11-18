import { Game as MainGame } from "./scenes/Game";
import { MainMenu } from "./scenes/MainMenu";

import { type Types } from "phaser";
import Phaser from "phaser";

const gameConfig: Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: "#262626",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [MainMenu, MainGame],
};

export default gameConfig;
