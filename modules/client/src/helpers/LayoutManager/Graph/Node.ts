export default class LayoutNode {
  public id: string;
  public x = 0;
  public y = 0;
  public mod = 0;

  public children: LayoutNode[] = [];
  public thread?: LayoutNode;

  constructor(id: string) {
    this.id = id;
  }
}
