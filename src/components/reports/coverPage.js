import { companyInfoAtom } from "@/recoils";
import moment from "moment";
import React from "react";
import { useRecoilValue } from "recoil";
/* eslint-disable react/no-unescaped-entities */
function CoverPage() {
  const companyInfo = useRecoilValue(companyInfoAtom)
  return (
    <div className="w-[21cm] h-[29.7cm] px-6 py-3 border shadow-lg flex items-center justify-center">
      <div className="text-xl text-center">
        <h1 className="font-bold">{companyInfo?.clientName}</h1>
        <h1>Directors' report and audited financial statements</h1>
        <h1>for the year ended</h1>
        <h1 className="font-bold">{moment(companyInfo?.endDate).format("DD MMMM YYYY")}</h1>
      </div>
    </div>
  );
}

export default CoverPage;
