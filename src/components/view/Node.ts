import Renderer from "../../helpers/Renderer";
import View from "./View";

export default class Node implements View {
  private x: number;
  private y: number;
  private width: number;
  private height: number;
  private color: string;
  private renderer: Renderer;

  constructor(x: number, y: number, width: number, height: number, color: string, renderer: Renderer) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.renderer = renderer;
  }

  public render = () => {
    this.renderer.setFillStyle(this.color);
    this.renderer.fillRect(this.x, this.y, this.width, this.height);
  };
}
