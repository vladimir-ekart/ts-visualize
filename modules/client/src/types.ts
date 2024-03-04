import { Message } from "@ts-visualize/shared/constants/client";

export type PIXI = typeof import("pixi.js");

export interface VSCode {
  postMessage: (message: Message) => void;
}
