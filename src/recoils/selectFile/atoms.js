import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "parsed-data", // this key is using to store data in local storage
  storage: sessionStorage, // configurate which stroage will be used to store the data
});

export const selectedFileAtom = atom({
  key: "selected-file",
  default: null,
});

export const parsedDataAtom = atom({
  key: "parsed-data",
  default: {
    data: null,
    cols: null,
  },
  effects_UNSTABLE: [persistAtom],
});
