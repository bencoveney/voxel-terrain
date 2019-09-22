import * as THREE from "three";
const SKY_COLOR = 0xdddddd;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

var renderer = new THREE.WebGLRenderer({
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

var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

export function render(deltaTime: number) {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}
