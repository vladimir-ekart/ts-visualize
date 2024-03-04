import Graph from "@ts-visualize/shared/components/model/Graph";

import Renderer from "../../helpers/Renderer";
import House from "../view/House";
import Node from "../view/Node";

class Controller {
  private graph: Graph;
  private renderer: Renderer;

  constructor(graph: Graph, renderer: Renderer) {
    this.graph = graph;
    this.renderer = renderer;
  }

  public render = () => {
    const house = new House(this.renderer);
    const node = new Node(50, 50, 100, 100, "red", this.renderer);

    house.render();
    node.render();
  };
}

export default Controller;
