import Graph from "@ts-visualize/shared/components/model/Graph";
import { NodeType } from "@ts-visualize/shared/components/model/Node/types";

import LayoutManager from "../../helpers/LayoutManager";
import Renderer from "../../helpers/Renderer";
import Edge from "../view/Edge";
import Node from "../view/Node";

class Controller {
  private graph: Graph;
  private renderer: Renderer;
  private layoutManager: LayoutManager;

  private views: Node[] = [];
  private edges: Edge[] = [];

  constructor(graph: Graph, renderer: Renderer, layoutManager: LayoutManager) {
    this.graph = graph;
    this.renderer = renderer;
    this.layoutManager = layoutManager;
  }

  public render = () => {
    this.graph.nodesMap.forEach((node) => {
      const position = this.layoutManager.getNodePosition(node.id);

      if (!position) {
        return;
      }

      const viewData = {
        name: node.meta?.name || "",
        path: node.meta?.fileName || "",
        type: node.meta?.type || NodeType.FUNCTION,
      };
      const view = new Node(position.x, position.y, 340, 160, viewData, this.renderer);

      this.views.push(view);

      node.children.forEach((child) => {
        const childPosition = this.layoutManager.getNodePosition(child.id);

        if (!childPosition) {
          return;
        }

        const edge = new Edge(position.x + 170, position.y + 80, childPosition.x + 170, childPosition.y + 80, this.renderer);

        this.edges.push(edge);
      });
    });

    this.edges.forEach((edge) => edge.render());
    this.views.forEach((view) => view.render());
  };
}

export default Controller;
