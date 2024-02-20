import vscode, { ExtensionContext, WebviewPanel } from "vscode";

export const getHtml = (context: ExtensionContext, panel: WebviewPanel) => {
  const rendererPath = vscode.Uri.joinPath(context.extensionUri, "dist", "modules", "client", "index.js");

  const rendererScriptUri = panel.webview.asWebviewUri(rendererPath);

  return `
    <!doctype html>
    <html>
      <body>
        <script src="${rendererScriptUri}"></script>
      </body>
    </html>
`;
};
