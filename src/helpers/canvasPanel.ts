import * as vscode from "vscode";

import { CANVAS_HTML_BODY } from "../templates/canvas";
import { getBaseHtmlTemplate } from "../utils/getBaseHtmlTemplate";

export const initCanvasPanel = () => {
  const panel = vscode.window.createWebviewPanel("ts-visualize", "Dependency Graph", vscode.ViewColumn.One, {
    enableScripts: true,
  });

  panel.webview.html = getBaseHtmlTemplate(CANVAS_HTML_BODY);

  return panel;
};
