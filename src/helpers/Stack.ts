export default class Stack<T> {
  private stack: T[];

  constructor(item?: T) {
    this.stack = item ? [item] : [];
  }

  public push = (item: T) => this.stack.push(item);
  public pop = () => this.stack.pop();
  public getLast = (): T | undefined => this.stack[this.stack.length - 1];
}
