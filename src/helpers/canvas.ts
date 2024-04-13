import { COMMAND } from "@ts-visualize/shared/constants/client";
import { ExtensionContext, WebviewPanel } from "vscode";

import { getHtml } from "../templates/html";
import WebviewClient from "./WebviewClient";

export const initCanvas = (context: ExtensionContext, panel: WebviewPanel, client: WebviewClient) => {
  const html = getHtml(context, panel);

  return new Promise((resolve) => {
    client.subscribeToEvent(COMMAND.READY, () => resolve(true));

    panel.webview.html = html;
  });
};
