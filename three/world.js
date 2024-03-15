import { createCamera } from "./components/camera";
import { createScene } from "./components/scene";
import { createRenderer } from "./systems/renderer";
import { Resizer } from "./systems/Resizer";
import { createAmbientLights, createLights } from "./components/lights";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Particles } from "./particles/particles";

let scene;
let camera;
let controls;
let renderer;
let lights;
let container;
let ambientLights;

class World {
    constructor() {
        scene = createScene();
        camera = createCamera();
        renderer = createRenderer();
        lights = createLights();
        ambientLights = createAmbientLights();
        this.particles = new Particles();
        this.particles.init("/sp_128.png");
        this.particles.container.position.set(0, 0, 0);
        scene.add(lights, ambientLights, this.particles.container);
    }

  async init(c) {
    container = c;
    controls = new OrbitControls(camera, container);
    controls.enabled = false;

    controls.update();

    container.append(renderer.domElement);

    const resizer = new Resizer(container, camera, renderer);
  }

  render() {
    this.particles.update();
    renderer.render(scene, camera);
  }
}

export { World };
