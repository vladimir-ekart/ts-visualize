import { COMMAND, RenderMessage } from "@ts-visualize/shared/constants/client";
import { ExtensionContext, WebviewPanel } from "vscode";

export default class WebviewClient {
  private panel: WebviewPanel;
  private context: ExtensionContext;

  private onReady?: () => void;

  constructor(context: ExtensionContext, panel: WebviewPanel) {
    this.panel = panel;
    this.context = context;
  }

  public sendRender = (payload: RenderMessage["payload"]) => {
    this.panel.webview.postMessage({ command: COMMAND.RENDER, payload });
  };

  public subscribeToEvent = (command: COMMAND, callback: () => void) => {
    switch (command) {
      case COMMAND.READY:
        this.onReady = callback;
    }
    this.bindEvents();
  };

  private bindEvents = () => {
    this.panel.webview.onDidReceiveMessage(
      (message) => {
        switch (message.command) {
          case COMMAND.READY:
            this.onReady && this.onReady();
        }
      },
      undefined,
      this.context.subscriptions
    );
  };
}
