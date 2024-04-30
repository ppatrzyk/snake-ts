import { Scene } from 'phaser';

type Direction = "up" | "down" | "right" | "left"

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    snake: Phaser.GameObjects.Image;

    // grid: Phaser.Tilemaps.Tilemap;
    cellSize: number;
    
    stepFreq: number;
    timer: number;

    constructor() {
        super('Game');
    }

    create(): void {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor("#A0A0A0");

        this.stepFreq = 1000;
        this.timer = 0;

        this.cellSize = 32;
        let numberCellsX:number = Number(this.game.config.width) / this.cellSize;
        let numberCellsY:number = Number(this.game.config.height) / this.cellSize;
        
        this.snake = this.add.image(0, 0, "snake_body");
        this.snake.setOrigin(0)
        // this.grid = this.make.tilemap({
        //     width: numberCellsX,
        //     height: numberCellsY,
        //     tileWidth: cellSize,
        //     tileHeight: cellSize
        // });
        // const tileset = this.grid.addTilesetImage('tiles', null, 32, 32, 1, 2);
        // const layer = this.grid.createLayer("gameLayer", tileset, 0, 0);
        // this.grid = this.add.grid(0, 0, Number(this.game.config.width), Number(this.game.config.height), 32, 32);
        // this.grid.setFillStyle(0x4d4d4d, 1);
        // this.grid.showCells = true;
        // this.grid.showOutline = true;
        // console.log(this.grid)

        this.input.once('pointerdown', () => {

            this.scene.start('GameOver');

        });
    }

    move() {
        console.log("update")
        // TODO move based on current direction
        this.snake.setPosition(this.snake.x+this.cellSize, this.snake.y);
    }

    update(_time: number, delta: number): void {
        this.timer += delta;
        if (this.timer >= this.stepFreq) {
            this.move()
            this.timer = 0;
        }
    }
}
