"use client";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

// let sessionStore = typeof window !== "undefined" ? window.sessionStorage : null;

const { persistAtom } = recoilPersist({
  key: "parsed-data", // this key is using to store data in local storage
//   storage: sessionStorage,
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
