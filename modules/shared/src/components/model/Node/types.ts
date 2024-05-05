export interface Meta {
  fileName: string;
  name: string;
}

export type MetaArg = Omit<Meta, "name"> & { name?: Meta["name"] };

export interface SerializedNode {
  id: string;
  children: string[];
  parents: string[];
  meta?: Meta;
}
