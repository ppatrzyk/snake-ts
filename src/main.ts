import { Game as MainGame } from './scenes/Game';
import { MainMenu } from './scenes/MainMenu';

import { Game, Types } from "phaser";

const config: Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#262626',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        MainMenu,
        MainGame,
    ]
};

export default new Game(config);
