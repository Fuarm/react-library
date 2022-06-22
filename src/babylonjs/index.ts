import {
  ArcRotateCamera,
  CubicEase,
  EasingFunction,
  ISceneLoaderProgressEvent,
  Scene,
  SceneLoader,
  Vector3,
  Animation,
  ActionManager,
  ExecuteCodeAction,
  ActionEvent,
  Color3,
  PBRMaterial
} from "@babylonjs/core";
import createEngine from "./createEngine";
import createScene from "./createScene";
import '@babylonjs/loaders/glTF';

import './config'
import { rgb } from "../utils";

type ModelAnimation = { position: number[], target: number[] }
type LoadModeCallback = (event: ISceneLoaderProgressEvent) => void

class LibraryScene {
  private _scene!: Scene;
  private _camera!: ArcRotateCamera;
  private _cacheMesheNames: {name: string, color: Color3}[] = []

  constructor(canvas: HTMLCanvasElement, callback?: LoadModeCallback) {
    this.init(canvas, callback)
  }

  async init(canvas: HTMLCanvasElement, callback?: LoadModeCallback) {
    const engine = await createEngine(canvas)
    this._scene = createScene(engine)
    this.createCamera()
    this.loadModel(callback)
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
      60,
      200,
      this._camera[type],
      position,
      0,
      ease
    );
  }

  async loadModel(callback?: LoadModeCallback) {
    await SceneLoader.AppendAsync('/model/', 'library.glb', this._scene, callback)
  }

  selectModel(names: string[], animation: ModelAnimation) {
    this._scene.meshes.map(mesh => {
      const _material = mesh.material as PBRMaterial
      const _cacheMeshIndex = this._cacheMesheNames?.map(item => item.name).flat().indexOf(mesh.name)
      if ( _cacheMeshIndex !== -1) {
        _material.albedoColor = this._cacheMesheNames[_cacheMeshIndex].color
      }
      if (names.includes(mesh.name)) {
        _cacheMeshIndex === -1
          && this._cacheMesheNames.push({name: mesh.name, color: _material.albedoColor})
        _material.albedoColor = rgb(0, 200, 255)
        this.showSelectModel(animation)
      }
    })
  }

  showSelectModel(animation: ModelAnimation) {
    this.animateCamera('position', new Vector3(...animation.position));
    this.animateCamera('target', new Vector3(...animation.target));
  }

  registerAction(names: string[], callback: (evt: ActionEvent) => void) {
    this._scene.meshes.forEach(mesh => {
      if (names.includes(mesh.name)) {
        mesh.actionManager = new ActionManager(this._scene)
        mesh.actionManager.registerAction(
          new ExecuteCodeAction(ActionManager.OnPickUpTrigger, callback))
      }
    })
  }
  
}

export default LibraryScene