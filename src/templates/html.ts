import vscode, { ExtensionContext, WebviewPanel } from "vscode";

export const getHtml = (context: ExtensionContext, panel: WebviewPanel) => {
  const rendererPath = vscode.Uri.joinPath(context.extensionUri, "modules", "client", "dist", "index.js");

  const rendererScriptUri = panel.webview.asWebviewUri(rendererPath);

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dependency Graph</title>
      </head>
      <body style="overflow:hidden;padding:0px">
        <script src="${rendererScriptUri}"></script>
      </body>
    </html>
`;
};
