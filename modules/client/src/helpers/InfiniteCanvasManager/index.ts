import { Application, Container } from "pixi.js";

import CanvasStore from "./Store";

export default class CanvasManager {
  private app: Application;
  private container: Container;

  private canvasStore: CanvasStore;

  constructor(app: Application, container: Container) {
    this.app = app;
    this.container = container;

    this.canvasStore = new CanvasStore(window.innerWidth, window.innerHeight);
  }

  private attach = (root: HTMLElement) => {
    this.app.ticker.add(() => {
      const { x, y } = this.canvasStore.getProjectionState();
      const scale = this.canvasStore.getProjectionScale();
      this.container.position.set(-scale.x * x, -scale.y * y);
      this.container.scale.set(scale.x, scale.y);
    });

    root.addEventListener("mousewheel", this.wheelListener, { passive: false });
    root.addEventListener("pointermove", this.pointerListener, { passive: true });
  };

  private detach = (root: HTMLElement) => {
    root.removeEventListener("mousewheel", this.wheelListener);
    root.removeEventListener("pointermove", this.pointerListener);
  };

  public start = () => {
    this.attach(document.body);

    window.onload = () => {
      this.attach(document.body);
    };

    window.onbeforeunload = () => {
      this.detach(document.body);
    };
  };

  private wheelListener = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();

    const event = e as WheelEvent;

    if (!event.ctrlKey) {
      this.canvasStore.moveCamera(event.deltaX, event.deltaY);
    } else {
      this.canvasStore.zoomCamera(event.deltaY);
    }
  };

  private pointerListener = (e: PointerEvent) => {
    this.canvasStore.movePointer({ offsetX: e.offsetX, offsetY: e.offsetY });
  };
}
