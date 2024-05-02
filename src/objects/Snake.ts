import { GameObjects, Scene } from "phaser";
import { Coordinates, STEP_SIZE } from "../scenes/Game"

type Direction = "up" | "down" | "right" | "left"

export class Snake extends GameObjects.GameObject {
    
    snakeBody: GameObjects.Group;
    currentDirection: Direction = "right";
    stepSize: number = STEP_SIZE;

    constructor(scene: Scene) {
        super(scene, "Snake");
        this.snakeBody = new GameObjects.Group(scene);
        let bodyPart: GameObjects.Image = new GameObjects.Image(this.scene, this.stepSize, this.stepSize, "snake_body");
        bodyPart.setOrigin(0)
        this.snakeBody.add(bodyPart, true);
    }

    // https://stackoverflow.com/a/44827922
    private areSetsEqual(a: Set<any>, b: Set<any>): boolean {
        return (a.size === b.size && [...a].every(value => b.has(value)))
    };

    changeDirection(newDirection: Direction) {
        let horizontal: Set<Direction> = new Set(["left", "right"]);
        let vertical: Set<Direction> = new Set(["down", "up"]);
        let change: Set<Direction> = new Set([this.currentDirection, newDirection]);
        if (this.areSetsEqual(change, horizontal) || this.areSetsEqual(change, vertical)) {
            // ignore, opposite direction
        } else {
            console.log("changing")
            this.currentDirection = newDirection;
        }
    }

    public getBodyCoordinates(): Coordinates {
        // TODO fix: foreach treat as image
        this.snakeBody.getChildren().forEach(bodyPart: GameObjects.Image => {[bodyPart.x, bodyPart.y]})
    }

    grow():void {
        let head = this.snakeBody.getFirst(true);
        let tail = this.snakeBody.getLast(true);
        console.log(head)
        console.log(tail)
        let x:number = 0;
        let y:number = 0;
        let bodyPart: GameObjects.Image = new GameObjects.Image(this.scene, x, y, "snake_body");
        bodyPart.setOrigin(0)
        this.snakeBody.add(bodyPart, true);
    }

    move(): void {
        let x: number
        let y: number
        switch (this.currentDirection) {
            case "left":
                [x, y] = [-this.stepSize,  0]
                break
            case "right":
                [x, y] = [this.stepSize,  0]
                break
            case "up":
                [x, y] = [0, -this.stepSize]
                break
            case "down":
                [x, y] = [0, this.stepSize]
                break
            default:
                [x, y] = [0, 0];
                break
        }
        this.snakeBody.incXY(x, y);
    }
}
