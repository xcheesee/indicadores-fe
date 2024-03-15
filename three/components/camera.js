import { PerspectiveCamera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function createCamera() {
  const camera = new PerspectiveCamera(75, 1, 0.01, 99999);
  camera.position.set(5, -50, 30);
  return camera;
}

export { createCamera };
