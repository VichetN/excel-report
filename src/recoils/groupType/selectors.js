import { groupTypeAtom } from "./atoms";

const { selector } = require("recoil");

export const totalGroupTypeSelector = selector({
  key: "total-grouptype-selector",
  get: ({ get }) => {
    const groupType = get(groupTypeAtom);

    // get sub in groupType
    const subArr = groupType?.map((load) => load?.sub || []);
    const newSubArr = subArr?.flat();
    // get items in sub
    const itemsArr = newSubArr?.map((load) => load?.items || []);
    const newItemsArr = itemsArr?.flat();

    const totalCurrentYear = newItemsArr?.reduce(
      (acc, curr) => acc + curr?.currentYearBalance,
      0
    );
    const totalPastYear = newItemsArr?.reduce(
      (acc, curr) => acc + curr?.pastYearBalance,
      0
    );
    return { totalCurrentYear, totalPastYear };
  },
});
