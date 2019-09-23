import * as THREE from "three";

import { generateTerrain, CHUNK_SIZE, CHUNK_HEIGHT } from "./generateTerrain";

const terrain = generateTerrain(0, 0, 0);

const SKY_COLOR = 0xffffff;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  antialias: false,
  alpha: false,
  stencil: false,
  powerPreference: "high-performance"
});
renderer.setSize(window.innerWidth, window.innerHeight, true);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(SKY_COLOR);
document.body.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(SKY_COLOR));

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
scene.add(directionalLight);

const water = new THREE.Mesh(
  new THREE.BoxGeometry(CHUNK_SIZE, 1, CHUNK_SIZE),
  new THREE.MeshLambertMaterial({ color: 0x0000ff })
);
water.translateX(CHUNK_SIZE / 2);
water.translateY(-1);
water.translateZ(CHUNK_SIZE / 2);
scene.add(water);

const unitBox = new THREE.BoxGeometry(1, 1, 1);
const green = new THREE.MeshLambertMaterial({ color: 0x44aa33 });

for (let x = 0; x < CHUNK_SIZE; x++) {
  for (let y = 0; y < CHUNK_HEIGHT; y++) {
    for (let z = 0; z < CHUNK_SIZE; z++) {
      const density = terrain[x][y][z] - y / CHUNK_HEIGHT;

      if (density < 0) {
        continue;
      }

      const cube = new THREE.Mesh(unitBox, green);
      cube.translateX(x + 0.5);
      cube.translateY(y);
      cube.translateZ(z + 0.5);
      scene.add(cube);
    }
  }
}

camera.position.x = CHUNK_SIZE;
camera.position.y = CHUNK_HEIGHT * 2;
camera.position.z = CHUNK_SIZE;
camera.lookAt(new THREE.Vector3(0, -CHUNK_SIZE / 2, 0));

export function render(deltaTime: number) {
  renderer.render(scene, camera);
}
