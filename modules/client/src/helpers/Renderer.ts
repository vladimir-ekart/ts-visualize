import { Application, ICanvas } from "pixi.js";

type PIXI = typeof import("pixi.js");

export default class Renderer {
  public pixi: PIXI;
  public app: Application<ICanvas>;

  constructor(pixi: PIXI, app: Application<ICanvas>) {
    this.pixi = pixi;
    this.app = app;
  }
}
