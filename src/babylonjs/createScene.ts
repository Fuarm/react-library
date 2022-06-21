import {
  Engine,
  HemisphericLight,
  Scene,
  Vector3
} from "@babylonjs/core"
import { rgb } from "../utils";
import { babylonDebug } from "./config";

export default function createScene(engine: Engine) {
  const scene = new Scene(engine);
  scene.clearColor = rgb(25, 25, 25);
  new HemisphericLight('light', new Vector3(0, 1, 0), scene);
  engine.runRenderLoop(() => scene.render());

  __ISDEV__ && babylonDebug(scene)

  return scene
}