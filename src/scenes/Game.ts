import { Scene } from 'phaser';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    msg_text : Phaser.GameObjects.Text;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor("#A0A0A0");

        this.msg_text = this.add.text(
            this.registry.get("titleX"),
            this.registry.get("titleY"),
            'Game window TODO',
            this.registry.get("textStyle")
        ).setOrigin(0.5);

        this.input.once('pointerdown', () => {

            this.scene.start('GameOver');

        });
    }
}
