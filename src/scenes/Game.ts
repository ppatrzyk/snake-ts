import { GameObjects, Scene } from 'phaser';
import { Snake } from "../objects/Snake"
import { Apple } from '../objects/Apple';

export type Coordinate = `${number}_${number}`;
export type CoordinateList = Array<Coordinate>;
export const STEP_SIZE: number = 32;

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    snake: Snake;
    apple: Apple;
    gameCoordinates: CoordinateList;
    
    stepSize: number = STEP_SIZE;
    stepFreq: number = 100;
    timer: number = 100;

    constructor() {
        super('Game');
    }

    extractXY(object: GameObjects.GameObject): Coordinate {
        let bodyPart = object as GameObjects.Image
        return `${bodyPart.x}_${bodyPart.y}`
    }

    // possible coordinates within game, not taken by snake
    private getEmptyCoordinates(snakeCoordinates: CoordinateList): CoordinateList {
        let empty = this.gameCoordinates.filter(x => !snakeCoordinates.includes(x));
        return empty
    }

    create(): void {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor("#A0A0A0");

        this.snake = new Snake(this, this.stepSize, this.stepSize)
        this.snake = this.add.existing(this.snake)

        this.apple = new Apple(this, this.stepSize*4, this.stepSize*4);
        this.apple.setOrigin(0)
        this.apple = this.add.existing(this.apple);

        this.gameCoordinates = new Array();
        for (let i = 0; i < Number(this.game.config.width); i += STEP_SIZE) {
            for (let j = 0; j < Number(this.game.config.height); j += STEP_SIZE) {
                this.gameCoordinates.push(`${i}_${j}`)
            }
        }

        this.input.keyboard!.on('keydown-A', () => {this.snake.changeDirection("left")});
        this.input.keyboard!.on('keydown-LEFT', () => {this.snake.changeDirection("left")});
        this.input.keyboard!.on('keydown-S', () => {this.snake.changeDirection("down")});
        this.input.keyboard!.on('keydown-DOWN', () => {this.snake.changeDirection("down")});
        this.input.keyboard!.on('keydown-W', () => {this.snake.changeDirection("up")});
        this.input.keyboard!.on('keydown-UP', () => {this.snake.changeDirection("up")});
        this.input.keyboard!.on('keydown-D', () => {this.snake.changeDirection("right")});
        this.input.keyboard!.on('keydown-RIGHT', () => {this.snake.changeDirection("right")});
    }

    tick() {
        let snakeCoordinates = this.snake.getBodyCoordinates()
        let score: number = snakeCoordinates.length;
        console.log("tick, score ", score)
        let appleCoordinate = this.extractXY(this.apple);
        if (snakeCoordinates.includes(appleCoordinate)) {
            this.snake.move(true);
            this.apple.destroy(true);
            let emptyCoordinates = this.getEmptyCoordinates(snakeCoordinates);
            // todo if empty, game over
            let randomCoordinate: Coordinate = emptyCoordinates[Math.floor(Math.random() * emptyCoordinates.length)];
            let [x, y] = randomCoordinate.split("_").map(c => Number(c));
            this.apple = new Apple(this, x, y);
            this.apple.setOrigin(0)
            this.apple = this.add.existing(this.apple);
        // } else if () {
            // TODO die on collision
        //     // snake collision, game over
        } else {
            this.snake.move(false);
        }
        // check collision here

        // check collision 
        // this.game.config.width
        // this.scene.sta rt('GameOver');
    }

    update(_time: number, delta: number): void {
        this.timer += delta;
        if (this.timer >= this.stepFreq) {
            this.tick()
            this.timer = 0;
        }
    }
}
