import fs from "fs";
import ts from "typescript";

import GraphComposer from "./GraphComposer";

export const analyze = (paths: string[]) => {
  const graphComposer = new GraphComposer();

  paths.forEach((path) => {
    const fileContent = fs.readFileSync(path, "utf8");
    const sourceFile = ts.createSourceFile(path, fileContent, ts.ScriptTarget.Latest);

    graphComposer.compose(sourceFile);
  });

  const graph = graphComposer.getGraph();

  return graph;
};
