// import Renderer from "helpers/Renderer";
// import { Container } from "pixi.js";

// // import CanvasStore from "./CanvasStore";

// export default class InfiniteCanvasManager {
//   private renderer: Renderer;
//   private store: CanvasStore;

//   constructor(renderer: Renderer, store: CanvasStore) {
//     this.renderer = renderer;
//     this.store = store;
//   }

//   public attach = (canvas: Container) => {
//     const { app } = this.renderer;
//     const store = this.store;

//     app.ticker.add(() => {
//       const { x, y } = store.getScreen();
//       const scale = store.getScale();
//       canvas.position.set(-scale.x * x, -scale.y * y);
//       canvas.scale.set(scale.x, scale.y);
//     });
//   };
// }
