import { accountingTypes } from "@/constants";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "group-type", // this key is using to store data in local storage
  //   storage: sessionStorage,
});

export const groupTypeAtom = atom({
  key: "group-type-atom",
  default: [...accountingTypes],
  effects_UNSTABLE: [persistAtom],
});
