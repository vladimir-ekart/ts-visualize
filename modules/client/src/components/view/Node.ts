import { Container, Graphics, Text } from "pixi.js";

import Renderer from "../../helpers/Renderer";
import View from "./View";

export default class Node implements View {
  private x: number;
  private y: number;
  private width: number;
  private height: number;
  private text: string;
  private renderer: Renderer;

  constructor(x: number, y: number, width: number, height: number, text: string, renderer: Renderer) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
    this.renderer = renderer;
  }

  public render = () => {
    const block = new Container();
    const bg = new Graphics();

    bg.beginFill("white");
    bg.drawRect(this.x, this.y, this.width, this.height);
    bg.endFill();
    block.addChild(bg);

    const textElement = new Text(this.text, {
      fill: 0x000000,
      fontSize: 10,
      fontWeight: "700",
      wordWrap: false,
    });

    textElement.anchor.set(0.5);
    textElement.position.set(this.x + block.width / 2, this.y + block.height / 2);

    block.addChild(textElement);

    this.renderer.container.addChild(block);
  };
}
