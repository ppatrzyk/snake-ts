import { GameObjects, type Scene } from "phaser";
import { type CoordinateList, type Game, STEP_SIZE } from "../scenes/Game";

type Direction = "up" | "down" | "right" | "left";
type Body = Array<GameObjects.Image>;

export class Snake extends GameObjects.GameObject {
  snakeBody: Body = [];
  horizontalDir: Set<Direction> = new Set(["left", "right"]);
  verticalDir: Set<Direction> = new Set(["down", "up"]);
  previousDirection: Direction = "right";
  nextDirection: Direction = "right";
  stepSize: number = STEP_SIZE;

  constructor(scene: Scene, initX: number, initY: number) {
    super(scene, "Snake");
    this.addBodyPart(initX, initY);
  }

  // https://stackoverflow.com/a/44827922
  private areSetsEqual(a: Set<any>, b: Set<any>): boolean {
    return a.size === b.size && [...a].every((value) => b.has(value));
  }

  changeDirection(newDirection: Direction) {
    const change: Set<Direction> = new Set([
      this.previousDirection,
      newDirection,
    ]);
    if (
      this.areSetsEqual(change, this.horizontalDir) ||
      this.areSetsEqual(change, this.verticalDir)
    ) {
      // ignore, opposite direction
    } else {
      this.nextDirection = newDirection;
    }
  }

  changeDirectionFromCoordinates(x: number, y: number) {
    const snakeHeadObj = this.snakeBody[this.snakeBody.length - 1];
    // console.log('Canvas coordinates:', x, y);
    // console.log('snakeHeadObj coordinates:', snakeHeadObj.x, snakeHeadObj.y);
    if (this.horizontalDir.has(this.previousDirection)) {
      if (y >= snakeHeadObj.y) {
        this.changeDirection("down");
      } else {
        this.changeDirection("up");
      }
    } else if (this.verticalDir.has(this.previousDirection)) {
      if (x >= snakeHeadObj.x) {
        this.changeDirection("right");
      } else {
        this.changeDirection("left");
      }
    }
  }

  public getBodyCoordinates(): CoordinateList {
    return this.snakeBody.map((child) => {
      const game = this.scene as Game;
      return game.extractXY(child);
    });
  }

  addBodyPart(x: number, y: number): void {
    const bodyPart: GameObjects.Image = new GameObjects.Image(
      this.scene,
      x,
      y,
      "snake_body",
    );
    bodyPart.setOrigin(0);
    this.scene.add.existing(bodyPart);
    this.snakeBody.push(bodyPart);
  }

  move(grow: boolean): void {
    const head = this.snakeBody[this.snakeBody.length - 1] as GameObjects.Image;
    const tail = this.snakeBody[0] as GameObjects.Image;
    let x: number;
    let y: number;
    switch (this.nextDirection) {
      case "left":
        [x, y] = [head.x - this.stepSize, head.y];
        break;
      case "right":
        [x, y] = [head.x + this.stepSize, head.y];
        break;
      case "up":
        [x, y] = [head.x, head.y - this.stepSize];
        break;
      case "down":
        [x, y] = [head.x, head.y + this.stepSize];
        break;
      default:
        [x, y] = [head.x, head.y];
        break;
    }
    this.previousDirection = this.nextDirection;
    if (!grow) {
      this.snakeBody.shift();
      tail.destroy(true);
    }
    this.addBodyPart(x, y);
  }

  getScore(): number {
    return this.getBodyCoordinates().length;
  }
}
