"use client";

import AuditorReport from "./auditorReport";
import BalanceSheetReport from "./balanceSheetReport";
import CoverPage from "./coverPage";
import DirectorReport from "./directorReport";
import UpdateCompanyInfo from "./updateCompanyInfo";

function Reports() {
  return (
    <section className="my-2 sm:my-4 p-4 rounded-lg shadow-xl bg-white overflow-x-auto">
      <div className="flex gap-4">
        <div className="flex flex-col gap-4">
          <CoverPage />
          <DirectorReport />
          <AuditorReport />
          <BalanceSheetReport />
        </div>
        <div className="w-full">
          <UpdateCompanyInfo />
        </div>
        {/* <div className="w-auto" ref={leftTableRef}>
          <Table
            data={parsedData?.data}
            cols={parsedData?.cols}
            isRowDraggable
          />
        </div>

        <div className="w-full">
          <BalanceSheet />
        </div> */}
      </div>
    </section>
  );
}

export default Reports;
