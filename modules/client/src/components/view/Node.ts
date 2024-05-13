import { NodeType } from "@ts-visualize/shared/components/model/Node/types";
import { Container, Graphics, Text } from "pixi.js";

import Renderer from "../../helpers/Renderer";
import { getPathText } from "../../utils/getPathText";
import { getTypeText } from "../../utils/getTypeText";
import View from "./View";

interface Data {
  name: string;
  type: NodeType;
  path: string;
}

const PADDING = 18;

export default class Node implements View {
  private x: number;
  private y: number;
  private width: number;
  private height: number;
  private data: Data;
  private renderer: Renderer;

  constructor(x: number, y: number, width: number, height: number, data: Data, renderer: Renderer) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.data = data;
    this.renderer = renderer;
  }

  public render = () => {
    this.renderMainBlock();
    this.renderNameLabel();
    this.renderTypeLabel();
    this.renderPathLabel();
  };

  private renderMainBlock = () => {
    const block = new Container();
    const bg = new Graphics();

    bg.beginFill("1E1E1E");
    bg.lineStyle(1, "525252", 1);
    bg.drawRoundedRect(this.x, this.y, this.width, this.height, 10);
    bg.endFill();
    block.addChild(bg);

    this.renderer.container.addChild(block);
  };

  private renderNameLabel = () => {
    const title = new Text(this.data.name, {
      fill: "FFFFFF",
      fontSize: 20,
      fontWeight: "800",
      wordWrap: false,
    });

    title.position.set(this.x + PADDING, this.y + PADDING);

    this.renderer.container.addChild(title);
  };

  private renderTypeLabel = () => {
    const text = getTypeText(this.data.type);

    const title = new Text(text, {
      fill: "FFFFFF",
      fontSize: 16,
      fontWeight: "400",
      wordWrap: false,
    });

    title.position.set(this.x + PADDING, this.y + 46);

    this.renderer.container.addChild(title);
  };

  private renderPathLabel = () => {
    const text = getPathText(this.data.path);

    const title = new Text(text, {
      fill: "FFFFFF",
      fontSize: 13,
      fontWeight: "400",
      wordWrap: false,
    });

    title.anchor.set(1, 1);
    title.position.set(this.x + this.width - PADDING, this.y + this.height - PADDING);

    this.renderer.container.addChild(title);
  };
}
