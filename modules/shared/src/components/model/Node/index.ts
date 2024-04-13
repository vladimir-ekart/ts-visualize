import { Meta, MetaArg, SerializedNode } from "./types";

class Node {
  public id: string;
  public neighbors: Node[];
  public parents: Node[];
  public meta?: Meta;

  constructor(id: string, meta?: MetaArg) {
    this.id = id;
    this.neighbors = [];
    this.parents = [];

    if (meta) {
      this.meta = { ...meta, name: meta.name ?? "default" };
    }
  }

  public serialize = (): SerializedNode => ({
    id: this.id,
    meta: this.meta,
    neighbors: this.neighbors.map((node) => node.id),
    parents: this.parents.map((node) => node.id),
  });

  public deserialize = (serializedNode: SerializedNode, getNode: (id: string) => Node) => {
    const { id, meta, neighbors, parents } = serializedNode;

    this.id = id;
    this.meta = meta;
    this.neighbors = neighbors.map((id) => getNode(id));
    this.parents = parents.map((id) => getNode(id));
  };
}

export default Node;
