import { createHash } from "crypto";

export const generateNodeId = (args: { name?: string; fileName?: string }) => createHashFromIdString(`${args.fileName}-${args.name}`);

const createHashFromIdString = (input: string) => createHash("sha1").update(input).digest("hex");
