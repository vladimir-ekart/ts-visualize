import { SerializedGraph } from "../components/model/Graph/types";

export enum COMMAND {
  READY = "ready",
  RENDER = "render",
}

export interface RenderMessage {
  command: COMMAND.RENDER;
  payload: { serializedGraph: SerializedGraph };
}

export interface ReadyMessage {
  command: COMMAND.READY;
  payload?: undefined;
}

export type Message = RenderMessage | ReadyMessage;
