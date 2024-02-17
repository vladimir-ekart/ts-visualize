export interface Meta {
  fileName: string;
  name: string;
}

export type MetaArg = Omit<Meta, "name"> & { name?: Meta["name"] };
