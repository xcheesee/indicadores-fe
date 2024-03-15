import { AmbientLight, DirectionalLight } from "three";

function createLights() {
  const light = new DirectionalLight(0xffffff, 8);
  light.position.set(10, 10, 10);

  return light;
}

function createAmbientLights() {
  const light = new AmbientLight(0xffffff, 0.3);
  return light;
}

export { createLights, createAmbientLights };
