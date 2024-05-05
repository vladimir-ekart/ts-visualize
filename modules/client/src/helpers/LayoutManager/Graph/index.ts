import LayoutNode from "./Node";

export default class LayoutGraph {
  public nodesMap: Map<string, LayoutNode>;

  constructor() {
    this.nodesMap = new Map();
  }

  public addNode = (node: LayoutNode) => {
    this.nodesMap.set(node.id, node);
  };
}
