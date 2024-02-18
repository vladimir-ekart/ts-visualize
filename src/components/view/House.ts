import Renderer from "../../helpers/Renderer";
import View from "./View";

export default class House implements View {
  private renderer: Renderer;

  constructor(renderer: Renderer) {
    this.renderer = renderer;
  }

  public render = () => {
    this.renderer.setFillStyle("white");
    this.renderer.fillRect(0, 0, 800, 800);

    this.renderer.setFillStyle("black");

    // Set line width
    this.renderer.setLineWidth(10);

    // Wall
    this.renderer.strokeRect(75, 140, 150, 110);

    // Door
    this.renderer.fillRect(130, 190, 40, 60);

    // Roof
    this.renderer.beginPath();
    this.renderer.moveTo(50, 140);
    this.renderer.lineTo(150, 60);
    this.renderer.lineTo(250, 140);
    this.renderer.closePath();
    this.renderer.stroke();
  };
}
