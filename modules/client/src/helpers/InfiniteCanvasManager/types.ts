export interface CanvasState {
  container: {
    width: number;
    height: number;
  };
  camera: {
    x: number;
    y: number;
    z: number;
  };
  pointer: {
    x: number;
    y: number;
  };
}

export interface Config {
  camera?: {
    x: number;
    y: number;
    z: number;
  };
}
