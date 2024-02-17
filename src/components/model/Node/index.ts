import { Meta, MetaArg } from "./types";

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
}

export default Node;
