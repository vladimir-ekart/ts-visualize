import vscode, { ExtensionContext } from "vscode";

import { getHtml } from "../templates/html";

export const initCanvasPanel = (context: ExtensionContext) => {
  const panel = vscode.window.createWebviewPanel("ts-visualize", "Dependency Graph", vscode.ViewColumn.One, {
    enableScripts: true,
    localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, "dist", "modules", "client")],
  });

  const html = getHtml(context, panel);

  panel.webview.html = html;

  return panel;
};
