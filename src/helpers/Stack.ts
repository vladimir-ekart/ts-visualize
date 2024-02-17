import Node from "../components/model/Node";

export default class Stack {
  private stack: Node[];

  constructor(node?: Node) {
    this.stack = node ? [node] : [];
  }

  public push = (node: Node) => this.stack.push(node);
  public pop = () => this.stack.pop();
  public getLast = (): Node | undefined => this.stack[this.stack.length - 1];
}
