// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

import { analyze } from "./helpers/analyzer";
import { initCanvas } from "./helpers/canvas";
import WebviewClient from "./helpers/WebviewClient";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  vscode.window.showInformationMessage("ts-visualize is now active");

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand("ts-visualize.show", () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    vscode.workspace.findFiles("**/*.ts", "**/node_modules/**").then((files) => {
      const paths = files.map((file) => file.fsPath);
      const panel = vscode.window.createWebviewPanel("ts-visualize", "Dependency Graph", vscode.ViewColumn.One, {
        enableScripts: true,
        localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, "modules", "client", "dist")],
      });
      const client = new WebviewClient(context, panel);

      initCanvas(context, panel, client).then(() => {
        const graph = analyze(paths);
        const serializedGraph = graph.serialize();

        client.sendRender({ serializedGraph });
      });
    });

    // vscode.window.showInformationMessage("Hello World from ts-visualize!");
  });

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
