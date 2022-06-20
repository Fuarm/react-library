import { DracoCompression, SceneLoader } from "@babylonjs/core";

DracoCompression.Configuration = {
  decoder: {
    // wasmUrl: `draco_wasm_wrapper_gltf.js`,
    // wasmBinaryUrl: `draco_decoder_gltf.wasm`,
    // fallbackUrl: `draco_decoder_gltf.js`
  }
}
// 全屏loading
SceneLoader.ShowLoadingScreen = false