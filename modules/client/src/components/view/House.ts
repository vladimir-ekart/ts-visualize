import Renderer from "../../helpers/Renderer";
import View from "./View";

export default class House implements View {
  private renderer: Renderer;

  constructor(renderer: Renderer) {
    this.renderer = renderer;
  }

  public render = () => {
    const style = new this.renderer.pixi.TextStyle({
      dropShadow: true,
      dropShadowAngle: Math.PI / 6,
      dropShadowBlur: 4,
      dropShadowColor: "#000000",
      dropShadowDistance: 6,
      fill: ["#ffffff", "#00ff99"],

      fontFamily: "Arial",

      fontSize: 36,

      fontStyle: "italic",

      fontWeight: "bold",

      lineJoin: "round",
      // gradient
      stroke: "#4a1850",
      strokeThickness: 5,
      wordWrap: true,
      wordWrapWidth: 440,
    });

    const richText = new this.renderer.pixi.Text("Rich text with a lot of options and across multiple lines", style);

    richText.x = 50;
    richText.y = 220;

    this.renderer.container.addChild(richText);
  };
}
