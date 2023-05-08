import { companyInfoAtom, groupTypeAtom } from "@/recoils";
import moment from "moment";
import React, { Fragment } from "react";
import { useRecoilValue } from "recoil";

function Row({ rowData }) {
  const totalCurrentYear = rowData?.items?.reduce(
    (acc, curr) => acc + (curr?.currentYearBalance || 0),
    0
  );
  const totalPastYear = rowData?.items?.reduce(
    (acc, curr) => acc + (curr?.pastYearBalance || 0),
    0
  );
  return (
    <div className="flex">
      <div className="flex-1">
        <p>{rowData?.title}</p>
      </div>
      <div className="w-[200px] grid grid-cols-2 text-right">
        <div>{Number(totalCurrentYear || 0).toFixed(2)}</div>
        <div>{Number(totalPastYear || 0).toFixed(2)}</div>
      </div>
    </div>
  );
}

function RowTotal({ subGroup }) {
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
    <div className="">
      <div className="flex">
        <div className="flex-1" />
        <div className="w-[200px] grid grid-cols-2 border-t border-black text-right">
          <div>{Number(totalCurrentYear || 0).toFixed(2)}</div>
          <div>{Number(totalPastYear || 0).toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}

function BalanceSheetReport() {
  const companyInfo = useRecoilValue(companyInfoAtom);
  const groupType = useRecoilValue(groupTypeAtom);
  return (
    <div className="w-[21cm] h-[29.7cm] border py-2 shadow-lg">
      <div className="text-xl font-bold px-6 my-4">
        <h1>Balance sheet</h1>
        <h1>
          For the year ended{" "}
          {moment(companyInfo?.endDate).format("DD MMMM YYYY")}
        </h1>
      </div>

      <hr />

      <div className="my-4 mx-6">
        <div className="flex">
          <div className="flex-1" />
          <div className="w-[200px] grid grid-cols-2 text-center">
            <div>
              {moment(companyInfo?.endDate).format("YYYY")}
              <br />
              HKD
            </div>
            <div>
              {moment(companyInfo?.endDate).subtract(1, "year").format("YYYY")}
              <br />
              HKD
            </div>
          </div>
        </div>
      </div>

      <div className="my-4 mx-6">
        {groupType?.map((r, i) => (
          <Fragment key={r?.id}>
            <h2 className="font-bold ">{r?.title}</h2>
            {r?.sub?.map((load) => (
              <Row key={load?.id} rowData={load} />
            ))}
            <RowTotal subGroup={r?.sub} />
          </Fragment>
        ))}
      </div>

      {/* footer */}
      <hr />
      <div className="my-8 mx-6">
        <div>
          <p className="text-justify">
            Approved and authorised for issue by the directors on 28 April 2023.
          </p>
        </div>

        <div className="grid grid-cols-4 space-x-8 pt-16 px-8">
            <div className="col-span-2" />
            <div>
                <p className="border-t border-black text-center">Director 1</p>
            </div>
            <div>
                <p className="border-t border-black text-center">Director 1</p>
            </div>
        </div>

        <div className="mt-4">
          <p className="text-justify">
            The accompanying accounting policies and explanatory notes form an
            integral part of, and should be read in conjunction with, these
            financial statements.
          </p>
        </div>
      </div>
    </div>
  );
}

export default BalanceSheetReport;
