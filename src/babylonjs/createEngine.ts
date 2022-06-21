import {
  Engine,
  WebGPUEngine,
} from "@babylonjs/core"

export default function createEngine(canvas: HTMLCanvasElement) {
  const engine = "gpu" in navigator ? createWebGPUEngine(canvas) : createWebGLEngine(canvas)
  window.addEventListener('resize', () => engine.resize());
  return engine
}

const createWebGLEngine = (canvas: HTMLCanvasElement) => {
  return new Engine(canvas, true)
}

const createWebGPUEngine = (canvas: HTMLCanvasElement) => {
  return new WebGPUEngine(canvas)
}
