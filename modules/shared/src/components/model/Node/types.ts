export interface Meta {
  fileName: string;
  name: string;
}

export type MetaArg = Omit<Meta, "name"> & { name?: Meta["name"] };

export interface SerializedNode {
  id: string;
  neighbors: string[];
  parents: string[];
  meta?: Meta;
}
