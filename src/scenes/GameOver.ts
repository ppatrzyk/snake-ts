import { Scene } from 'phaser';

export class GameOver extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    gameover_text : Phaser.GameObjects.Text;

    constructor() {
        super('GameOver');
    }

    create(): void {
        this.camera = this.cameras.main
        this.camera.setBackgroundColor("#A0A0A0");

        this.gameover_text = this.add.text(
            this.registry.get("titleX"),
            this.registry.get("titleY"),
            'Game over',
            this.registry.get("textStyle")
        ).setOrigin(0.5);

        this.input.keyboard!.once('keydown', () => {
            this.scene.start('MainMenu');
        });
    }
}
