// import { totalGroupTypeSelector } from "@/recoils";
// import { useRecoilValue } from "recoil";

function RowTotal({ subGroup = [] }) {
  // const { totalCurrentYear, totalPastYear } = useRecoilValue(
  //   totalGroupTypeSelector
  // );

  // get items in sub
  const itemsArr = subGroup?.map((load) => load?.items || []);
  const newItemsArr = itemsArr?.flat();

  const totalCurrentYear = newItemsArr?.reduce(
    (acc, curr) => acc + (curr?.currentYearBalance || 0),
    0
  );
  const totalPastYear = newItemsArr?.reduce(
    (acc, curr) => acc + (curr?.pastYearBalance || 0),
    0
  );

  return (
    <div className="pl-8 w-full flex">
      <div className="px-3 flex-1" />
      <div className="w-[300px] grid grid-cols-2 bg-blue-100 font-bold">
        <div className="px-3 border border-black">
          {Number(totalCurrentYear || 0).toFixed(2)}
        </div>
        <div className="px-3 border border-black">
          {Number(totalPastYear || 0).toFixed(2)}
        </div>
      </div>
    </div>
  );
}

export default RowTotal;
