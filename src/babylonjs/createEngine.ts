import {
  Engine,
  WebGPUEngine,
  Scene
} from "@babylonjs/core"

export default async function createEngine(canvas: HTMLCanvasElement) {
  const engine = "gpu" in navigator ? await createWebGPUEngine(canvas) : createWebGLEngine(canvas)
  window.addEventListener('resize', () => engine.resize());
  return engine
}

const createWebGLEngine = (canvas: HTMLCanvasElement) => {
  return new Engine(canvas, true)
}

const createWebGPUEngine = async (canvas: HTMLCanvasElement) => {
  return await new WebGPUEngine(canvas).initAsync() as unknown as Engine
}
