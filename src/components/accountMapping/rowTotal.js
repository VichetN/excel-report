import { totalGroupTypeSelector } from "@/recoils";
import moment from "moment";
import React from "react";
import { useRecoilValue } from "recoil";

function RowTotal() {
  const { totalCurrentYear, totalPastYear } = useRecoilValue(
    totalGroupTypeSelector
  );
  console.log(totalCurrentYear, totalCurrentYear);
  return (
    <>
      <div className="pl-8 w-full flex">
        <div className="px-3 flex-1" />
        <div className="w-[300px] grid grid-cols-2">
          <div className="px-3 border font-bold">{moment().format("YYYY")}</div>
          <div className="px-3 border font-bold">
            {moment().subtract(1, "year").format("YYYY")}
          </div>
        </div>
      </div>
      <div className="pl-8 w-full flex">
        <div className="px-3 flex-1" />
        <div className="w-[300px] grid grid-cols-2">
          <div className="px-3 border">
            {Number(totalCurrentYear || 0).toFixed(2)}
          </div>
          <div className="px-3 border">{Number(totalPastYear || 0).toFixed(2)}</div>
        </div>
      </div>
    </>
  );
}

export default RowTotal;
