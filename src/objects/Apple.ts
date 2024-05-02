import { GameObjects, Scene } from "phaser";

export class Apple extends GameObjects.Image {
    constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y, "apple");
    }
}
