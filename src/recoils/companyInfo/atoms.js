import moment from "moment";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "company-info", // this key is using to store data in local storage
  //   storage: sessionStorage,
});

export const companyInfoAtom = atom({
  key: "company-info",
  default: {
    clientName: "[Client Name]",
    directorName: "[Director Name]",
    endDate: moment(),
  },
  effects_UNSTABLE: [persistAtom],
});
