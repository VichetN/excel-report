import moment from "moment";
import { atom } from "recoil";

export const companyInfoAtom = atom({
  key: "company-info",
  default: {
    clientName: "[Client Name]",
    directorName: "[Director Name]",
    endDate: moment(),
  },
});
