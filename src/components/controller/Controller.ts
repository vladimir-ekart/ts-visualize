import Graph from "../model/Graph";

class Controller {
  private graph: Graph;

  constructor(graph: Graph) {
    this.graph = graph;
  }

  public render = () => {
    this.graph.getRootNodes().forEach((node) => {
      console.log(node.id);
    });
  };
}

export default Controller;
