import path from "path";
import ts from "typescript";

import Graph from "../components/model/Graph";
import Node from "../components/model/Node";
import { generateNodeId } from "../utils/generateNodeId";
import Stack from "./Stack";
import Visitor from "./Visitor";

export default class GraphComposer extends Visitor {
  protected graph: Graph;
  protected currentFileName = "global";
  protected currentNodeStack: Stack;
  protected currentImports: Map<string, string>;

  constructor() {
    super();
    this.graph = new Graph();
    this.currentNodeStack = new Stack(new Node("global"));
    this.currentImports = new Map();
  }

  public compose = (node: ts.SourceFile) => this.visit(node);
  public getGraph = () => this.graph;

  visitSourceFile(node: ts.SourceFile): void {
    this.currentFileName = node.fileName;
    this.currentImports.clear();

    node.forEachChild((child) => this.visit(child));
  }

  visitFunctionDeclaration(node: ts.FunctionDeclaration): void {
    const name = node.name?.text;
    const id = generateNodeId({ fileName: this.currentFileName, name });
    const graphNode = this.graph.updateOrCreateNode(id, { fileName: this.currentFileName, name });

    this.currentNodeStack.push(graphNode);
    node.forEachChild((child) => this.visit(child));
    this.currentNodeStack.pop();
  }

  visitVariableDeclaration(node: ts.VariableDeclaration): void {
    const isArrowFunction = node.initializer && ts.isArrowFunction(node.initializer) && ts.isIdentifier(node.name);

    if (isArrowFunction) {
      const name = node.name.escapedText.toString();
      const id = generateNodeId({ fileName: this.currentFileName, name });
      const graphNode = this.graph.updateOrCreateNode(id, { fileName: this.currentFileName, name });

      this.currentNodeStack.push(graphNode);
    }

    node.forEachChild((child) => this.visit(child));

    if (isArrowFunction) {
      this.currentNodeStack.pop();
    }
  }

  visitCallExpression(node: ts.CallExpression): void {
    if (ts.isIdentifier(node.expression)) {
      const name = node.expression.escapedText.toString();
      const fileName = this.currentImports.get(name) ?? this.currentFileName;
      const id = generateNodeId({ fileName, name });

      const graphNode = this.graph.getOrCreateNode(id);
      const parentNode = this.currentNodeStack.getLast();

      if (parentNode && !parentNode.neighbors.includes(graphNode)) {
        parentNode?.neighbors.push(graphNode);
        graphNode.parents.push(parentNode);
      }
    }

    node.forEachChild((child) => this.visit(child));
  }

  visitImportDeclaration(node: ts.ImportDeclaration): void {
    if (ts.isStringLiteral(node.moduleSpecifier)) {
      const names = [];

      if (node.importClause?.name) {
        names.push(node.importClause.name.escapedText.toString());
      }

      if (node.importClause?.namedBindings && ts.isNamedImports(node.importClause?.namedBindings)) {
        node.importClause.namedBindings.elements.forEach((element) => {
          names.push(element.name.escapedText.toString());
        });
      }

      const relativePath = `${node.moduleSpecifier.text}.ts`;
      const fullPath = path.resolve(path.dirname(this.currentFileName), relativePath);

      names.forEach((name) => this.currentImports.set(name, fullPath));
    }

    node.forEachChild((child) => this.visit(child));
  }

  visitGeneralNode(node: ts.Node): void {
    node.forEachChild((child) => this.visit(child));
  }
}
