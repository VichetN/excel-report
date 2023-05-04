"use client";

import Table from "../table";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { parsedDataAtom, selectedDragRowAtom } from "@/recoils";
import BalanceSheet from "./balanceSheet";
import { useRef } from "react";
import { useClickAway } from "ahooks";

function AccountMapping() {
  const leftTableRef = useRef();
  const parsedData = useRecoilValue(parsedDataAtom);
  const [selectedDragRow, setSelectedDragRow] =
    useRecoilState(selectedDragRowAtom);

  useClickAway(
    () => {
      if (selectedDragRow?.length > 0) {
        setSelectedDragRow([]);
      }
    },
    leftTableRef,
    ["click", "drag"]
  );

  return (
    <section className="my-2 sm:my-4 p-4 rounded-lg shadow-xl bg-white overflow-x-auto">
      <div className="flex gap-4">
        <div className="w-auto" ref={leftTableRef}>
          <Table
            data={parsedData?.data}
            cols={parsedData?.cols}
            isRowDraggable
          />
        </div>

        <div className="w-full">
          <BalanceSheet />
        </div>
      </div>
    </section>
  );
}

export default AccountMapping;
