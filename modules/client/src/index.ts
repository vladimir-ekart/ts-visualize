import Graph from "@ts-visualize/shared/components/model/Graph";
import { COMMAND, RenderMessage } from "@ts-visualize/shared/constants/client";
import * as PIXI from "pixi.js";

import Controller from "./components/controller/Controller";
import ExtensionClient from "./helpers/ExtensionClient";
import Renderer from "./helpers/Renderer";
import { VSCode } from "./types";

declare const acquireVsCodeApi: () => VSCode;

const vscode = acquireVsCodeApi();

const client = new ExtensionClient(vscode);

client.sendReady();

const main = async () => {
  const graph = await getGraph();

  const app = new PIXI.Application({ background: "#1099bb", resizeTo: window });
  document.body.appendChild(app.view as unknown as Node);

  const renderer = new Renderer(PIXI, app);

  const controller = new Controller(graph, renderer);

  controller.render();
};

const getGraph = (): Promise<Graph> =>
  new Promise((resolve) => {
    client.subscribeToEvent<RenderMessage>(COMMAND.RENDER, (payload) => {
      const graph = new Graph();
      graph.deserialize(payload.serializedGraph);
      resolve(graph);
    });
  });

main();
