import { ArcRotateCamera, Engine, Scene, Vector3 } from "@babylonjs/core";
import createEngine from "./createEngine";
import createScene from "./createScene";

class LibraryScene {
  private _scene!: Scene;
  private _camera!: ArcRotateCamera;
  constructor(canvas: HTMLCanvasElement) {
    this.init(canvas)
  }

  async init(canvas: HTMLCanvasElement) {
    const engine = await createEngine(canvas)
    this._scene = createScene(engine)
    this.createCamera()
  }
  
  createCamera() {
    const camera = new ArcRotateCamera(
      'camera',
      Math.PI / 13,
      Math.PI / 3.5,
      22,
      new Vector3(8.4, 2.5, 0),
      this._scene,
    );
    camera.lowerBetaLimit = 0;
    camera.upperBetaLimit = Math.PI / 2.5;
    camera.lowerRadiusLimit = 1;
    camera.upperRadiusLimit = 30;
    camera.wheelPrecision = 100;
    camera.pinchPrecision = 100;
    camera.attachControl();

    this._camera = camera;
  }

  loadModel() {}
  
}

export default LibraryScene