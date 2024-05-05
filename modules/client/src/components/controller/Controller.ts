import Graph from "@ts-visualize/shared/components/model/Graph";

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

      console.log("Render node", node.meta?.name, position?.x, position?.y);

      if (!position) {
        return;
      }

      const text = `${node.meta?.name}: ${position.x}, ${position.y}`;
      const view = new Node(position.x, position.y, 150, 150, text, this.renderer);

      this.views.push(view);

      node.children.forEach((child) => {
        const childPosition = this.layoutManager.getNodePosition(child.id);

        if (!childPosition) {
          return;
        }

        console.log(`Render edge ${node.meta?.name} -> ${child.meta?.name}`, position.x, position.y, childPosition.x, childPosition.y);

        const edge = new Edge(position.x + 75, position.y + 75, childPosition.x + 75, childPosition.y + 75, this.renderer);

        this.edges.push(edge);
      });
    });

    this.edges.forEach((edge) => edge.render());
    this.views.forEach((view) => view.render());
  };
}

export default Controller;
