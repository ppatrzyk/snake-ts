import { GameObjects, Scene } from "phaser";
import { Coordinate, CoordinateList, Game, STEP_SIZE } from "../scenes/Game"

type Direction = "up" | "down" | "right" | "left"
type Body = Array<GameObjects.Image>;

export class Snake extends GameObjects.GameObject {
    
    snakeBody: Body = new Array();
    previousDirection: Direction = "right";
    nextDirection: Direction = "right";
    stepSize: number = STEP_SIZE;

    constructor(scene: Scene, initX: number, initY: number) {
        super(scene, "Snake");
        this.addBodyPart(initX, initY);
    }

    // https://stackoverflow.com/a/44827922
    private areSetsEqual(a: Set<any>, b: Set<any>): boolean {
        return (a.size === b.size && [...a].every(value => b.has(value)))
    };

    changeDirection(newDirection: Direction) {
        let horizontal: Set<Direction> = new Set(["left", "right"]);
        let vertical: Set<Direction> = new Set(["down", "up"]);
        let change: Set<Direction> = new Set([this.previousDirection, newDirection]);
        if (this.areSetsEqual(change, horizontal) || this.areSetsEqual(change, vertical)) {
            // ignore, opposite direction
        } else {
            this.nextDirection = newDirection;
        }
    }

    public getBodyCoordinates(): CoordinateList {
        return this.snakeBody.map(child => {
            let game = this.scene as Game
            return game.extractXY(child)
        })
    }

    addBodyPart(x:number, y:number):void {
        let bodyPart: GameObjects.Image = new GameObjects.Image(this.scene, x, y, "snake_body");
        bodyPart.setOrigin(0)
        this.scene.add.existing(bodyPart);
        this.snakeBody.push(bodyPart);
    }

    move(grow:boolean): void {
        let head = this.snakeBody[this.snakeBody.length-1] as GameObjects.Image;
        let tail = this.snakeBody[0] as GameObjects.Image;
        let x: number
        let y: number
        switch (this.nextDirection) {
            case "left":
                [x, y] = [head.x-this.stepSize, head.y]
                break
            case "right":
                [x, y] = [head.x+this.stepSize, head.y]
                break
            case "up":
                [x, y] = [head.x, head.y-this.stepSize]
                break
            case "down":
                [x, y] = [head.x, head.y+this.stepSize]
                break
            default:
                [x, y] = [head.x, head.y];
                break
        }
        this.previousDirection = this.nextDirection;
        if (!grow) {
            this.snakeBody.shift();
            tail.destroy(true);
        }
        this.addBodyPart(x, y);
    }
}
