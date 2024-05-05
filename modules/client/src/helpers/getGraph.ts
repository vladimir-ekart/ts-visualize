import Graph from "@ts-visualize/shared/components/model/Graph";
import { COMMAND, RenderMessage } from "@ts-visualize/shared/constants/client";

import ExtensionClient from "./ExtensionClient";

export const getGraph = (client: ExtensionClient): Promise<Graph> =>
  new Promise((resolve) => {
    client.subscribeToEvent<RenderMessage>(COMMAND.RENDER, (payload) => {
      console.log("Received graph", JSON.stringify(payload.serializedGraph));

      const graph = new Graph();
      graph.deserialize(payload.serializedGraph);

      console.log("Deserialized graph", graph);

      resolve(graph);
    });
  });
