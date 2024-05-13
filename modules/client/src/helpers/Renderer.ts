import { Application, Container, ICanvas } from "pixi.js";

import CanvasManager from "./InfiniteCanvasManager";

export default class Renderer {
  public app: Application<ICanvas>;
  public container: Container;

  constructor() {
    this.app = new Application({
      antialias: true,
      autoDensity: true,
      backgroundColor: "292a2f",
      height: window.innerHeight,
      resolution: 3,
      width: window.innerWidth,
    });

    document.body.appendChild(this.app.view as unknown as Node);

    this.container = new Container();

    this.app.stage.addChild(this.container);

    const canvasManager = new CanvasManager(this.app, this.container);
    canvasManager.start();
  }
}
