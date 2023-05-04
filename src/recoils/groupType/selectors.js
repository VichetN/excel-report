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

export const updateGroupTypeSelector = selector({
  key: "udpate-group-type",
  get: ({ get }) => get(groupTypeAtom),
  set: ({ get, set }, state) => {
    let groupType = [...get(groupTypeAtom)];

    const groupCategoryIndex = groupType?.findIndex(
      (e) => e?.id === state?.groupCategoryId
    );
    if (groupCategoryIndex > -1) {
      const currentCategory = groupType[groupCategoryIndex];

      const subTypes = [...currentCategory?.sub];
      const currentSubTypeIndex = subTypes?.findIndex(
        (e) => e?.id === state?.groupTypeId
      );

      const newSubType = {
        ...subTypes[currentSubTypeIndex],
        title: state?.title,
      };
      // replace new sub type
      subTypes?.splice(currentSubTypeIndex, 1, newSubType);
      // replace groupType
      groupType?.splice(groupCategoryIndex, 1, {
        ...currentCategory,
        sub: [...subTypes],
      });

      set(groupTypeAtom, groupType);
    }

    // console.log(state, groupType);
  },
});
