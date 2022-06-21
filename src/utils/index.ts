import { Color3, Color4 } from "@babylonjs/core";

export const rgb = (...color: number[]) => {
  return new Color3(...color.map((num) => num / 255))
};
export const rgba = (...color: number[]) => {
  return new Color4(...color.map((num, i) => i < 3 ? num / 255 : num))
};
