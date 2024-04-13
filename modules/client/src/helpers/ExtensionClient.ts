import { COMMAND, Message, RenderMessage } from "@ts-visualize/shared/constants/client";

import { VSCode } from "../types";

export default class ExtensionClient {
  private vscode: VSCode;

  private onRender?: (payload: RenderMessage["payload"]) => void;

  constructor(vscode: VSCode) {
    this.vscode = vscode;
  }

  public sendReady = () => {
    this.vscode.postMessage({ command: COMMAND.READY });
  };

  public subscribeToEvent = <T extends Message>(command: T["command"], callback: (payload: T["payload"]) => void) => {
    switch (command) {
      case COMMAND.RENDER:
        this.onRender = callback;
    }
    this.bindEvents();
  };

  private bindEvents = () => {
    window.addEventListener("message", (event) => {
      const message: Message = event.data;

      switch (message.command) {
        case COMMAND.RENDER:
          this.onRender && this.onRender(message.payload);
      }
    });
  };
}
