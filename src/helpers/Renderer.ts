import { ExtensionContext, WebviewPanel } from "vscode";

export default class Renderer {
  private context: ExtensionContext;
  private panel: WebviewPanel;

  public onClick?: () => void;

  constructor(context: ExtensionContext, panel: WebviewPanel) {
    this.context = context;
    this.panel = panel;
  }

  public setFillStyle = (style: string) => {
    this.panel.webview.postMessage({ command: "setFillStyle", payload: style });
  };

  public setLineWidth = (width: number) => {
    this.panel.webview.postMessage({ command: "setLineWidth", payload: width });
  };

  public strokeRect = (x: number, y: number, width: number, height: number) => {
    this.panel.webview.postMessage({ command: "strokeRect", payload: { height, width, x, y } });
  };

  public fillRect = (x: number, y: number, width: number, height: number) => {
    this.panel.webview.postMessage({ command: "fillRect", payload: { height, width, x, y } });
  };

  public beginPath = () => {
    this.panel.webview.postMessage({ command: "beginPath" });
  };

  public moveTo = (x: number, y: number) => {
    this.panel.webview.postMessage({ command: "moveTo", payload: { x, y } });
  };

  public lineTo = (x: number, y: number) => {
    this.panel.webview.postMessage({ command: "lineTo", payload: { x, y } });
  };

  public closePath = () => {
    this.panel.webview.postMessage({ command: "closePath" });
  };

  public stroke = () => {
    this.panel.webview.postMessage({ command: "stroke" });
  };

  public bindEvents = () => {
    this.panel.webview.onDidReceiveMessage(
      (message) => {
        switch (message.command) {
          case "onClick":
            this.onClick && this.onClick();
        }
      },
      undefined,
      this.context.subscriptions
    );
  };
}
