"use client";

import AuditorReport from "./auditorReport";

function Reports() {

  return (
    <section className="my-2 sm:my-4 p-4 rounded-lg shadow-xl bg-white overflow-x-auto">
      <div className="flex gap-4">
        <AuditorReport />
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
