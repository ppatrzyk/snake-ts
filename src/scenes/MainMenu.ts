import { Scene, GameObjects } from 'phaser';

export class MainMenu extends Scene
{
    title: GameObjects.Text;

    constructor() {
        super('MainMenu');
    }

    init(): void {
        let textStyle:Phaser.Types.GameObjects.Text.TextStyle = {
            fontFamily: 'Mono', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center',
        };
        this.registry.set("textStyle", textStyle);

        let titleX:number = Number(this.game.config.width) / 2;
        let titleY:number = Number(this.game.config.height) / 2;
        this.registry.set("titleX", titleX);
        this.registry.set("titleY", titleY);
    }

    preload(): void {
        this.load.setPath('assets');
        this.load.image('apple', 'apple.png');
        this.load.image('snake_body', 'snake_body.png');
    }

    create(): void {
        this.title = this.add.text(
            this.registry.get("titleX"),
            this.registry.get("titleY"),
            'Snake',
            this.registry.get("textStyle")
        ).setOrigin(0.5);

        this.input.keyboard!.on('keydown', () => {
            this.scene.start('Game');
        });
    }
}
