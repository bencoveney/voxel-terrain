import "./index.scss";

import { render } from "./render";

function gameLoop(callback: typeof onTick) {
  let lastTime = performance.now();
  function run(time: number): void {
    var deltaTime = time - lastTime;
    lastTime = time;

    // HACK: Prevent walks jumping while models load.
    const clampedDeltaTime = Math.max(Math.min(deltaTime, 50), 1);
    callback(clampedDeltaTime);

    requestAnimationFrame(run);
  }
  run(lastTime);
}

function onTick(deltaTime: number) {
  render(deltaTime);
}

gameLoop(onTick);
