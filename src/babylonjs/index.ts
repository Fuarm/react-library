import {
  ArcRotateCamera,
  CubicEase,
  EasingFunction,
  ISceneLoaderProgressEvent,
  Scene,
  SceneLoader,
  Vector3,
  Animation
} from "@babylonjs/core";
import createEngine from "./createEngine";
import createScene from "./createScene";
import '@babylonjs/loaders/glTF';

import './config'

class LibraryScene {
  private _scene!: Scene;
  private _camera!: ArcRotateCamera;

  constructor(canvas: HTMLCanvasElement) {
    this.init(canvas)
  }

  async init(canvas: HTMLCanvasElement) {
    const engine = createEngine(canvas)
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

  animateCamera(type: 'position' | 'target', position: unknown) {
    const ease = new CubicEase()
    ease.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT)
    Animation.CreateAndStartAnimation(
      "animation",
      this._camera,
      type,
      45,
      200,
      this._camera[type],
      position,
      0,
      ease
    );
  }

  loadModel(callback?: (event: ISceneLoaderProgressEvent) => void) {
    SceneLoader.AppendAsync('/model/', 'library.glb', this._scene, callback)
  }
  
}

export default LibraryScene