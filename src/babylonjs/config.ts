import { DracoCompression, Scene, SceneLoader } from "@babylonjs/core";

DracoCompression.Configuration = {
  decoder: {
    // wasmUrl: `draco_wasm_wrapper_gltf.js`,
    // wasmBinaryUrl: `draco_decoder_gltf.wasm`,
    // fallbackUrl: `draco_decoder_gltf.js`
  }
}
// 全屏loading
SceneLoader.ShowLoadingScreen = true

export const babylonDebug = async (scene: Scene) => {
  await import('@babylonjs/inspector')
  scene.debugLayer.show({ embedMode: true });
}

