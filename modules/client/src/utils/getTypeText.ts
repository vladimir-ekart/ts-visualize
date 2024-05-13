import { NodeType } from "@ts-visualize/shared/components/model/Node/types";

export const getTypeText = (type: NodeType) =>
  ({
    [NodeType.FUNCTION]: "Function",
    [NodeType.ARROW_FUNCTION]: "Arrow Function",
  })[type];
