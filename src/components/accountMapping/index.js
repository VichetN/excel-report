"use client";

import Table from "../table";
import { useRecoilState, useRecoilValue } from "recoil";
import { parsedDataAtom } from "@/recoils";
import BalanceSheet from "./balanceSheet";

function AccountMapping() {
  const [parsedData, setParsedData] = useRecoilState(parsedDataAtom);

  return (
    <section className="my-2 sm:my-4 p-4 rounded-lg shadow-xl bg-white overflow-x-auto">
      <div className="flex gap-4">
        <div className="w-auto">
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
