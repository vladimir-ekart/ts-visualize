import * as PIXI from "pixi.js";

import Controller from "./components/controller/Controller";
import ExtensionClient from "./helpers/ExtensionClient";
import { getGraph } from "./helpers/getGraph";
import CanvasManager from "./helpers/InfiniteCanvasManager";
import Renderer from "./helpers/Renderer";
import { VSCode } from "./types";

declare const acquireVsCodeApi: () => VSCode;

const vscode = acquireVsCodeApi();

const client = new ExtensionClient(vscode);

client.sendReady();

const main = async () => {
  const graph = await getGraph(client);

  const renderer = new Renderer(PIXI);
  const canvasManager = new CanvasManager(renderer.app, renderer.container);
  const controller = new Controller(graph, renderer);

  controller.render();
  canvasManager.render();
};

main();
