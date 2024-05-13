import { Graphics } from "pixi.js";

import Renderer from "../../helpers/Renderer";
import View from "./View";

export default class Edge implements View {
  private x1: number;
  private y1: number;
  private x2: number;
  private y2: number;
  private renderer: Renderer;

  constructor(x1: number, y1: number, x2: number, y2: number, renderer: Renderer) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.renderer = renderer;
  }

  public render = () => {
    const line = new Graphics();

    line.lineStyle(1, "C0C0C0", 1);
    line.moveTo(this.x1, this.y1);
    line.lineTo(this.x2, this.y2);

    this.renderer.container.addChild(line);
  };
}
