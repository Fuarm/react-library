import { Color4 } from "@babylonjs/core";

export const rgb = (...color: number[]) => {
  return new Color4(...color.map((i) => i / 255));
};
