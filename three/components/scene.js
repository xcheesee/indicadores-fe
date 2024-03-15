import { Scene, Color } from "three";

function createScene() {
  const scene = new Scene();
  scene.background = new Color(0xf0f9ff);

  return scene;
}

export { createScene };
