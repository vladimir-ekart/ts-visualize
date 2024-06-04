import Graph from "@ts-visualize/shared/components/model/Graph";
import Node from "@ts-visualize/shared/components/model/Node";

import LayoutGraph from "./Graph";
import LayoutNode from "./Graph/Node";
import { Options } from "./types";

export default class LayoutManager {
  private graph: Graph;
  private options: Options;

  private layoutGraph: LayoutGraph;

  constructor(graph: Graph, options: Options) {
    this.graph = graph;
    this.options = options;

    this.layoutGraph = new LayoutGraph();

    this.layout();
  }

  private layout = () => {
    const tree = this.setup(this.graph.getRootNodes()[0]);
    this.addMods(tree);
  };

  private addMods = (tree: LayoutNode, mod = 0) => {
    tree.x += mod;
    tree.children.forEach((child) => this.addMods(child, mod + tree.mod));
  };

  private setup = (tree: Node, depth = 0, parent?: LayoutNode) => {
    const layoutNode = new LayoutNode(tree.id);
    parent?.children.push(layoutNode);

    this.layoutGraph.addNode(layoutNode);

    layoutNode.y = depth;

    if (tree.children.length === 0) {
      layoutNode.x = 0;
      return layoutNode;
    }

    if (tree.children.length === 1) {
      layoutNode.x = this.setup(tree.children[0], depth + 1, layoutNode)?.x;
      return layoutNode;
    }

    let left: LayoutNode | undefined;
    let right: LayoutNode | undefined;

    tree.children.forEach((child) => {
      left = right;
      right = this.setup(child, depth + 1, layoutNode);

      if (left && right) {
        this.fixSubtrees(left, right);
      }
    });

    const leftX = layoutNode.children[0]?.x ?? 0;
    const rightX = right?.x ?? 0;

    layoutNode.x = leftX + (rightX - leftX) / 2;

    return layoutNode;
  };

  private fixSubtrees = (left: LayoutNode, right: LayoutNode) => {
    const contour = this.contour(left, right);

    const { leftInner, rightInner, leftOffset, leftOuter, righOuter } = contour;
    let { maxOffset: diff, rightOffset } = contour;

    // diff += (left.x + diff + right.x) % 2;
    diff += 2;

    right.mod = diff;
    right.x += diff;

    if (right.children) {
      rightOffset += diff;
    }

    if (rightInner && !leftInner) {
      if (leftOuter) {
        leftOuter.thread = rightInner;
        leftOuter.mod = rightOffset - leftOffset;
      }
    } else if (leftInner && !rightInner) {
      if (righOuter) {
        righOuter.thread = leftInner;
        righOuter.mod = leftOffset - rightOffset;
      }
    }
  };

  private contour = (
    left: LayoutNode,
    right: LayoutNode,
    maxOffset = 0,
    leftOffset = 0,
    rightOffset = 0,
    leftOuter?: LayoutNode,
    righOuter?: LayoutNode
  ): {
    leftInner?: LayoutNode;
    leftOffset: number;
    leftOuter?: LayoutNode;
    maxOffset: number;
    righOuter?: LayoutNode;
    rightInner?: LayoutNode;
    rightOffset: number;
  } => {
    const delta = left.x + leftOffset - (right.x + rightOffset);
    if (!maxOffset || delta > maxOffset) {
      maxOffset = delta;
    }

    if (!leftOuter) {
      leftOuter = left;
    }
    if (!righOuter) {
      righOuter = right;
    }

    const nextLeftOuter = this.nextLeft(leftOuter);
    const leftInner = this.nextRight(left);
    const rightInner = this.nextLeft(right);
    const nextRightOuter = this.nextRight(righOuter);

    if (leftInner && rightInner) {
      leftOffset += left.mod;
      rightOffset += right.mod;
      return this.contour(leftInner, rightInner, maxOffset, leftOffset, rightOffset, nextLeftOuter, nextRightOuter);
    }

    return { leftInner, leftOffset, leftOuter, maxOffset, righOuter, rightInner, rightOffset };
  };

  private nextRight = (node: LayoutNode) => {
    if (node.thread) {
      return node.thread;
    }
    if (node.children.length) {
      return node.children[node.children.length - 1];
    }
    return undefined;
  };

  private nextLeft = (node: LayoutNode) => {
    if (node.thread) {
      return node.thread;
    }
    if (node.children.length) {
      return node.children[0];
    }
    return undefined;
  };

  public getNodePosition = (id: string) => {
    const layoutNode = this.layoutGraph.nodesMap.get(id);

    return { x: (layoutNode?.x ?? 0) * this.options.nodeWidth, y: (layoutNode?.y ?? 0) * this.options.levelHeight };
  };
}
