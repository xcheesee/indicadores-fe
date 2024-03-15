import { ClickAway } from "./funcs";
import { World } from "~/three/world";

export const clickAwayStore = {
  instance: new ClickAway(),
};

export const worldStore = new World();
