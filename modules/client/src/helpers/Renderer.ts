import { Application, Container, ICanvas } from "pixi.js";

type PIXI = typeof import("pixi.js");

export default class Renderer {
  public pixi: PIXI;
  public app: Application<ICanvas>;
  public container: Container;

  constructor(pixi: PIXI) {
    this.pixi = pixi;
    this.app = new pixi.Application({
      antialias: true,
      autoDensity: true,
      backgroundColor: "red",
      height: window.innerHeight,
      resolution: 2,
      width: window.innerWidth,
    });

    document.body.appendChild(this.app.view as unknown as Node);

    this.container = new Container();

    this.app.stage.addChild(this.container);
  }
}
