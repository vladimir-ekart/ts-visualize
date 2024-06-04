import { CanvasState, Config } from "./types";
import { cameraToProjectionState, radians, scaleWithAnchorPoint } from "./utils";

const CAMERA_ANGLE = radians(30);
const SCROLL_FACTOR = 1.5;
const ZOOM_SCALE_FACTOR = 10;

export default class CanvasStore {
  private state: CanvasState;

  constructor(containerWidth: number, containerHeight: number, config?: Config) {
    const initialCameraState = config?.camera || {
      x: containerWidth / 2,
      y: containerHeight / 2,
      z: 800 / (2 * Math.tan(CAMERA_ANGLE)),
    };

    this.state = {
      // Camera is relative to the container
      camera: initialCameraState,
      container: {
        height: containerWidth,
        width: containerHeight,
      },
      // Pointer is relative to the container
      pointer: {
        x: 0,
        y: 0,
      },
    };
  }

  // Getters

  /**
   * Returns current projection state based on current camera state
   * @returns Current projection state
   */
  public getProjectionState = () => {
    const { x, y, z } = this.state.camera;
    const aspect = window.innerHeight / window.innerWidth;
    const angle = CAMERA_ANGLE;

    return cameraToProjectionState({ angle, x, y, z }, { aspect });
  };

  /**
   * Returns current scale based on current projection relative to the container
   * @returns Current projection scale
   */
  public getProjectionScale = () => {
    const { width: projectionWidth, height: projectionHeight } = this.getProjectionState();
    const { width: containerWidth, height: containerHeight } = this.state.container;

    return { x: containerWidth / projectionWidth, y: containerHeight / projectionHeight };
  };

  // Setters

  /**
   * Moves the camera base on the provided deltas and scroll factor
   * @param originalDeltaX The original delta x
   * @param originalDeltaY The original delta y
   * @param scrollFactor Custom scroll factor
   */
  public moveCamera = (originalDeltaX: number, originalDeltaY: number, scrollFactor?: number) => {
    const deltaX = originalDeltaX * (scrollFactor ?? SCROLL_FACTOR);
    const deltaY = originalDeltaY * (scrollFactor ?? SCROLL_FACTOR);

    // Move camera
    this.state.camera.x += deltaX;
    this.state.camera.y += deltaY;

    // Move pointer with the camera
    this.movePointer({ deltaX, deltaY, relative: true });
  };

  public movePointer(input: { deltaX: number; deltaY: number; relative: true }): void;
  public movePointer(input: { offsetX: number; offsetY: number; relative?: false }): void;
  public movePointer(
    input: { deltaX: number; deltaY: number; relative: true } | { offsetX: number; offsetY: number; relative?: false }
  ): void {
    const { x: projectionScaleX, y: projectionScaleY } = this.getProjectionScale();
    const { x: projectionX, y: projectionY } = this.getProjectionState();

    if (input.relative) {
      this.state.pointer.x += input.deltaX;
      this.state.pointer.y += input.deltaY;
      return;
    }

    this.state.pointer.x = projectionX + input.offsetX / projectionScaleX;
    this.state.pointer.y = projectionY + input.offsetY / projectionScaleY;
  }

  /**
   * Zooms the camera based on the provided delta
   * @param originalDelta The original delta
   */
  public zoomCamera = (originalDelta: number) => {
    const delta = ZOOM_SCALE_FACTOR * Math.max(originalDelta);
    const { x: oldX, y: oldY, z: oldZ } = this.state.camera;
    const oldScale = this.getProjectionScale();
    const { width: containerWidth, height: containerHeight } = this.state.container;

    const { width: newProjectionWidth, height: newProjectionHeight } = cameraToProjectionState(
      { angle: CAMERA_ANGLE, x: oldX, y: oldY, z: oldZ + delta },
      { aspect: window.innerHeight / window.innerWidth }
    );

    const newScaleX = containerWidth / newProjectionWidth;
    const newScaleY = containerHeight / newProjectionHeight;

    const { x: newX, y: newY } = scaleWithAnchorPoint(
      this.state.pointer.x,
      this.state.pointer.y,
      oldX,
      oldY,
      oldScale.x,
      oldScale.y,
      newScaleX,
      newScaleY
    );

    const newZ = oldZ + delta;

    this.state.camera = {
      x: newX,
      y: newY,
      z: newZ,
    };
  };
}
