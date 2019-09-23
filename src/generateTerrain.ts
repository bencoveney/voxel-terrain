import * as noise from "./noise";

export const CHUNK_SIZE = 50;
export const CHUNK_HEIGHT = 10;
const NOISE_SCALE = 10;

export function generateTerrain(
  chunkX: number,
  chunkY: number,
  chunkZ: number
) {
  const out: number[][] = [];
  for (let x = 0; x < CHUNK_SIZE; x++) {
    let xAxis = [];
    out.push(xAxis);
    for (let y = 0; y < CHUNK_HEIGHT; y++) {
      let yAxis = [];
      xAxis.push(yAxis);
      for (let z = 0; z < CHUNK_SIZE; z++) {
        let value = noise.perlin3(
          x / NOISE_SCALE,
          y / NOISE_SCALE,
          z / NOISE_SCALE
        );
        let clamped = offset(value);
        yAxis.push(clamped);
      }
    }
  }
  return out;
}

function offset(value) {
  return value;
  //const HEIGHT_SCALE = 10;
  //return Math.round(value * HEIGHT_SCALE) + HEIGHT_SCALE;
}

export type Chunk = number[];
