import Controller from "./components/controller/Controller";
import ExtensionClient from "./helpers/ExtensionClient";
import { getGraph } from "./helpers/getGraph";
import LayoutManager from "./helpers/LayoutManager";
import Renderer from "./helpers/Renderer";
import { VSCode } from "./types";

declare const acquireVsCodeApi: () => VSCode;

const vscode = acquireVsCodeApi();

const client = new ExtensionClient(vscode);

client.sendReady();

const main = async () => {
  const graph = await getGraph(client);

  const renderer = new Renderer();
  const layoutManager = new LayoutManager(graph, { levelHeight: 200, nodeWidth: 120 });
  const controller = new Controller(graph, renderer, layoutManager);

  controller.render();
};

main();
