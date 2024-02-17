import ts from "typescript";

export default abstract class Visitor {
  abstract visitSourceFile(node: ts.SourceFile): void;
  abstract visitFunctionDeclaration(node: ts.FunctionDeclaration): void;
  abstract visitVariableDeclaration(node: ts.VariableDeclaration): void;
  abstract visitCallExpression(node: ts.CallExpression): void;
  abstract visitImportDeclaration(node: ts.ImportDeclaration): void;
  abstract visitGeneralNode(node: ts.Node): void;

  visit(node: ts.Node) {
    if (ts.isSourceFile(node)) {
      this.visitSourceFile(node);
    }
    if (ts.isFunctionDeclaration(node)) {
      this.visitFunctionDeclaration(node);
    }
    if (ts.isVariableDeclaration(node)) {
      this.visitVariableDeclaration(node);
    }
    if (ts.isCallExpression(node)) {
      this.visitCallExpression(node);
    }
    if (ts.isImportDeclaration(node)) {
      this.visitImportDeclaration(node);
    }
    this.visitGeneralNode(node);
  }
}
