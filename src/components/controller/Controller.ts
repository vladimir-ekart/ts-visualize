import Renderer from "../../helpers/Renderer";
import Graph from "../model/Graph";
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
    new House(this.renderer).render();
    new Node(50, 50, 100, 100, "red", this.renderer).render();
  };
}

export default Controller;
