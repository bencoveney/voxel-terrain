import * as THREE from "three";

import { generateTerrain, CHUNK_SIZE } from "./generateTerrain";

const terrain = generateTerrain(0, 0, 0);

const SKY_COLOR = 0xdddddd;

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

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);

const unitBox = new THREE.BoxGeometry(1, 1, 1);
const green = new THREE.MeshLambertMaterial({ color: 0x00ff00 });

for (let x = 0; x < CHUNK_SIZE; x++) {
  for (let z = 0; z < CHUNK_SIZE; z++) {
    const cube = new THREE.Mesh(unitBox, green);
    cube.translateX(x);
    cube.translateZ(z);

    const heightLookup = x * CHUNK_SIZE + z;
    cube.translateY(terrain[heightLookup]);

    scene.add(cube);
  }
}

camera.position.x = CHUNK_SIZE;
camera.position.y = CHUNK_SIZE / 3;
camera.position.z = CHUNK_SIZE;
camera.lookAt(new THREE.Vector3(0, -CHUNK_SIZE / 2, 0));

export function render(deltaTime: number) {
  renderer.render(scene, camera);
}
