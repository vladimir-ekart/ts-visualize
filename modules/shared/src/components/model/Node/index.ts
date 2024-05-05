import { Meta, MetaArg, SerializedNode } from "./types";

class Node {
  public id: string;
  public children: Node[];
  public parents: Node[];
  public meta?: Meta;

  constructor(id: string, meta?: MetaArg) {
    this.id = id;
    this.children = [];
    this.parents = [];

    if (meta) {
      this.meta = { ...meta, name: meta.name ?? "default" };
    }
  }

  public serialize = (): SerializedNode => ({
    children: this.children.map((node) => node.id),
    id: this.id,
    meta: this.meta,
    parents: this.parents.map((node) => node.id),
  });

  public deserialize = (serializedNode: SerializedNode, getNode: (id: string) => Node) => {
    const { id, meta, children: neighbors, parents } = serializedNode;

    this.id = id;
    this.meta = meta;
    this.children = neighbors.map((id) => getNode(id));
    this.parents = parents.map((id) => getNode(id));
  };
}

export default Node;
