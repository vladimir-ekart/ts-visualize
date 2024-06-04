/**
 * Calculates the projection coordinates and size based on the camera position and angle
 * @param camera Position and angle of the camera
 * @param projection Aspect ratio of the projection
 * @returns The projection coordinates and size
 */
export const cameraToProjectionState = (camera: { x: number; y: number; z: number; angle: number }, projection: { aspect: number }) => {
  // Based on: Tan(θ) = (projectionWidth / 2) / z
  const projectionWidth = 2 * camera.z * Math.tan(camera.angle);
  const projectionHeight = projectionWidth / projection.aspect;

  // Calculate projection coordinates based on camera position and projection size
  const projectionX = camera.x - projectionWidth / 2;
  const projectionY = camera.y - projectionHeight / 2;

  return { height: projectionHeight, width: projectionWidth, x: projectionX, y: projectionY };
};

/**
 * Scales the camera position based on an anchor point
 * @param anchorPointX The anchor point x
 * @param anchorPointY The anchor point y
 * @param cameraX1 The original camera x
 * @param cameraY1 The original camera y
 * @param scaleX1 The original scale x
 * @param scaleY1 The original scale y
 * @param scaleX2 The new scale x
 * @param scaleY2 The new scale y
 * @returns The new camera position
 */
export const scaleWithAnchorPoint = (
  anchorPointX: number,
  anchorPointY: number,
  cameraX1: number,
  cameraY1: number,
  scaleX1: number,
  scaleY1: number,
  scaleX2: number,
  scaleY2: number
) => {
  const cameraX2 = (anchorPointX * (scaleX2 - scaleX1) + scaleX1 * cameraX1) / scaleX2;
  const cameraY2 = (anchorPointY * (scaleY2 - scaleY1) + scaleY1 * cameraY1) / scaleY2;
  return { x: cameraX2, y: cameraY2 };
};

export const radians = (angle: number) => angle * (Math.PI / 180);
