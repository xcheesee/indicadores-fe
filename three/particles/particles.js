import * as THREE from "three";
import vShader from "./shaders/particle.vert";
import fShader from "./shaders/particle.frag";
class Particles {
  constructor() {
    this.container = new THREE.Object3D();
  }

  async init(src) {
    const loader = new THREE.TextureLoader();
    const texture = await loader.loadAsync(src);
    this.texture = texture;
    this.texture.minFilter = THREE.LinearFilter;
    this.texture.magFilter = THREE.LinearFilter;
    this.texture.format = THREE.RGBAFormat;

    this.width = texture.image.width;
    this.height = texture.image.height;
    this.initPoints(true);
  }

  initPoints(discard) {
    this.numPoints = this.width * this.height;
    const geometry = new THREE.InstancedBufferGeometry();
    let numVisible = this.numPoints
    let threshold = 0;
    let originalColors;

    if (discard) {
      numVisible = 0;
      threshold = 32;

      const img = this.texture.image;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = this.width;
      canvas.height = this.height;
      ctx.scale(1, -1);
      ctx.drawImage(img, 0, 0, this.width, this.height * -1);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      originalColors = Float32Array.from(imgData.data);

      for (let i = 0; i < this.numPoints; i++) {
        let avg =
          (originalColors[i * 4 + 0] +
            originalColors[i * 4 + 1] +
            originalColors[i * 4 + 2]) /
          3;
        if (avg > threshold) numVisible++;
      }
    }

    const uniforms = {
      uTime: { value: 5.0 },
      uRandom: { value: 1.0 },
      uDepth: { value: 2.0 },
      uSize: { value: 0.8 },
      uTextureSize: { value: new THREE.Vector2(this.width, this.height) },
      uTexture: { value: this.texture },
      uTouch: { value: null },
    };

    const material = new THREE.RawShaderMaterial({
      uniforms,
      vertexShader: vShader,
      fragmentShader: fShader,
      depthTest: false,
      transparent: true,
    });

    const positions = new THREE.BufferAttribute(new Float32Array(4 * 3), 3);
    positions.setXYZ(0, -0.5, 0.5, 0);
    positions.setXYZ(1, 0.5, 0.5, 0);
    positions.setXYZ(2, -0.5, -0.5, 0);
    positions.setXYZ(3, 0.5, -0.5, 0);
    geometry.setAttribute("position", positions);

    const uvs = new THREE.BufferAttribute(new Float32Array(4 * 2), 2);
    uvs.setXYZ(0, 0.0, 0.0);
    uvs.setXYZ(1, 1.0, 0.0);
    uvs.setXYZ(2, 0.0, 1.0);
    uvs.setXYZ(3, 1.0, 1.0);
    geometry.setAttribute("uv", uvs);

    geometry.setIndex(
      new THREE.BufferAttribute(new Uint16Array([0, 2, 1, 2, 3, 1]), 1),
    );

    const indices = new Uint16Array(numVisible);
    const offsets = new Float32Array(numVisible * 3);
    const angles = new Float32Array(numVisible);

    for (let i = 0, j = 0; i < this.numPoints; i++) {
      let avg =
        (originalColors[i * 4 + 0] +
          originalColors[i * 4 + 1] +
          originalColors[i * 4 + 2]) /
        3;
      if (discard && originalColors[i * 4 + 1] <= threshold) continue;
      offsets[j * 3 + 0] = i % this.width;
      offsets[j * 3 + 1] = Math.floor(i / this.width);

      indices[j] = i;

      angles[j] = Math.random() * Math.PI;
      j++;
    }

    geometry.setAttribute(
      "pindex",
      new THREE.InstancedBufferAttribute(indices, 1, false),
    );
    geometry.setAttribute(
      "angle",
      new THREE.InstancedBufferAttribute(angles, 1, false),
    );
    geometry.setAttribute(
      "offset",
      new THREE.InstancedBufferAttribute(offsets, 3, false),
    );

    this.mesh = new THREE.Mesh(geometry, material);
    this.container.add(this.mesh);
  }

  update() {
    if (!this.mesh) return;
    this.mesh.material.uniforms.uTime.value += 0.01;
  }

  cleanup() {
    this.mesh.geometry.dispose()
    this.mesh.material.dispose()
    delete this.mesh
    delete this.texture

  }
}

export { Particles };
