import Node from "./Node";
import { MetaArg } from "./Node/types";

class Graph {
  public nodesMap: Map<string, Node>;

  constructor() {
    this.nodesMap = new Map();
  }

  public getOrCreateNode = (id: string) => {
    const node = this.nodesMap.get(id);

    if (node) {
      return node;
    }

    const newNode = new Node(id);
    this.nodesMap.set(id, newNode);

    return newNode;
  };

  public updateOrCreateNode = (id: string, meta: MetaArg) => {
    const node = this.nodesMap.get(id);

    if (node) {
      node.meta = { ...meta, name: meta.name ?? "default" };
      return node;
    }

    const newNode = new Node(id, meta);
    this.nodesMap.set(id, newNode);

    return newNode;
  };

  public getRootNodes = () => {
    const rootNodes = new Set<Node>();

    this.nodesMap.forEach((node) => {
      if (node.parents.length === 0) {
        rootNodes.add(node);
      }
    });

    return Array.from(rootNodes);
  };
}

export default Graph;
