export interface Meta {
  fileName: string;
  name: string;
  type: NodeType;
}

export type MetaArg = Omit<Meta, "name"> & { name?: Meta["name"] };

export interface SerializedNode {
  id: string;
  children: string[];
  parents: string[];
  meta?: Meta;
}

export enum NodeType {
  FUNCTION = "Function",
  ARROW_FUNCTION = "ArrowFunction",
}
