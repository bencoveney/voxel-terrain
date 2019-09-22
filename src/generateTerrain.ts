import * as noise from "./noise";

export const CHUNK_SIZE = 100;
const HEIGHT_SCALE = 10;
const NOISE_SCALE = 100;

export function generateTerrain(
  chunkX: number,
  chunkY: number,
  chunkZ: number
) {
  const out = [];
  for (let x = 0; x < CHUNK_SIZE; x++) {
    for (let z = 0; z < CHUNK_SIZE; z++) {
      let value = noise.perlin2(x / NOISE_SCALE, z / NOISE_SCALE);
      let clamped = offset(value);
      out.push(clamped);
    }
  }
  return out;
}

function offset(value) {
  return Math.round(value * HEIGHT_SCALE) + HEIGHT_SCALE;
}

export type Chunk = number[];
