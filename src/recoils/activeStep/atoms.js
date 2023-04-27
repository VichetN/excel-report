import { stepsData } from "@/constants";
import { atom } from "recoil";

export const activeStepAtom = atom({
  key: "active-step",
  default: stepsData[0],
});
