import { Scene, type GameObjects } from "phaser";

export class MainMenu extends Scene {
  title!: GameObjects.Text;

  constructor() {
    super("MainMenu");
  }

  init(): void {
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      fontSize: 38,
      color: "#24d12a",
      align: "center",
    };
    this.registry.set("textStyle", textStyle);

    const titleX: number = Number(this.game.config.width) / 2;
    const titleY: number = Number(this.game.config.height) / 2;
    this.registry.set("titleX", titleX);
    this.registry.set("titleY", titleY);
  }

  preload(): void {
    this.load.image("apple", "apple.png");
    this.load.image("snake_body", "snake_body.png");
  }

  create(): void {
    this.title = this.add
      .text(
        this.registry.get("titleX"),
        this.registry.get("titleY"),
        "SNAKE\npress space",
        this.registry.get("textStyle"),
      )
      .setOrigin(0.5);

    this.input.keyboard?.on("keydown-SPACE", () => {
      this.scene.start("Game");
    });
  }
}
