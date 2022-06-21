import {
  ArcRotateCamera,
  CubicEase,
  EasingFunction,
  ISceneLoaderProgressEvent,
  Scene,
  SceneLoader,
  Vector3,
  Animation,
  PBRMetallicRoughnessMaterial
} from "@babylonjs/core";
import createEngine from "./createEngine";
import createScene from "./createScene";
import '@babylonjs/loaders/glTF';

import './config'
import { rgb } from "../utils";

type ModelAnimation = { position: number[], target: number[] }

class LibraryScene {
  private _scene!: Scene;
  private _camera!: ArcRotateCamera;
  private _cacheMesheNames: string[] = []

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

  selectModel(names: string[], animation: ModelAnimation) {
    const pbr = new PBRMetallicRoughnessMaterial("prb", this._scene);
    pbr.baseColor = rgb(0, 210, 255)
    pbr.metallic = 0.5;
    pbr.roughness = 0.7;
    this._scene.meshes.forEach(mesh => {
      if (this._cacheMesheNames.includes(mesh.name)) {
        mesh.material = pbr;
      }
      if (names.includes(mesh.name)) {
        this._cacheMesheNames.push(...names);
        mesh.material = pbr
        this.showSelectModel(animation);
      }
    });
  }

  showSelectModel(animation: ModelAnimation) {
    this.animateCamera('position', new Vector3(...animation.position));
    this.animateCamera('target', new Vector3(...animation.target));
  }
  
}

export default LibraryScene