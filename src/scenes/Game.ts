import { GameObjects, Scene } from 'phaser';
import { Snake } from "../objects/Snake"
import { Apple } from '../objects/Apple';

export type Coordinates = Array<Array<number>>;
export const STEP_SIZE: number = 32;

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    snake: Snake;
    apple: Apple;
    gameCoordinates: Coordinates;
    
    stepFreq: number = 500;
    timer: number = 500;

    constructor() {
        super('Game');
    }

    // possible coordicates within game, not taken by snake
    private getEmptyCoordinates() {
        // TODO all - snake
        // this.snake.getBodyCoordinates()
        return this.gameCoordinates
    }

    create(): void {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor("#A0A0A0");

        this.snake = new Snake(this)
        this.snake = this.add.existing(this.snake)

        this.gameCoordinates = new Array();
        for (let i = 0; i < Number(this.game.config.width); i += STEP_SIZE) {
            for (let j = 0; j < Number(this.game.config.height); j += STEP_SIZE) {
                this.gameCoordinates.push([i, j])
            }
        }

        // this.apple = new Apple(this, )

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
        console.log("update")
        console.log(this.getEmptyCoordinates())
        console.log(this.snake.getBodyCoordinates())
        // if eats, grow, otherwise move
        // this.snake.grow();
        this.snake.move();
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
