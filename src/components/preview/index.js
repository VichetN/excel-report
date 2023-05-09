"use client";

import jsPDF from "jspdf";
import { createRef, useRef } from "react";
import AuditorReport from "../reports/auditorReport";
import BalanceSheetReport from "../reports/balanceSheetReport";
import CoverPage from "../reports/coverPage";
import DirectorReport from "../reports/directorReport";
import { PDFExport } from "@progress/kendo-react-pdf";
import { GrDocumentPdf } from "react-icons/gr";

function PreviewPage() {
  const reportTemplateRef = createRef(null);

  const handleGeneratePdf = () => {
    // if (reportTemplateRef.current) {
    //   reportTemplateRef.current.save();
    // }
    const doc = new jsPDF({
      format: "a4",
      unit: "pt",
    });

    // Adding the fonts.
    // doc.setFont("Inter-Regular", "normal");

    doc.html(reportTemplateRef.current, {
      async callback(doc) {
        await doc.save("documents");
      },
      html2canvas: {scale: 0.75}
    });
  };

  return (
    <section className="my-2 sm:my-4 p-4 rounded-lg shadow-xl overflow-x-auto">
      <div className="flex flex-col items-center gap-4">
        <div className="">
          <button
            className="p-2 rounded-md bg-white flex gap-2"
            onClick={handleGeneratePdf}
          >
            Download <GrDocumentPdf size={30} />
          </button>
        </div>
        {/* <PDFExport paperSize="A4" margin="0" > */}
          <div className="flex flex-col bg-white" ref={reportTemplateRef}>
            <CoverPage />
            <DirectorReport />
            <AuditorReport />
            <BalanceSheetReport />
          </div>
        {/* </PDFExport> */}
      </div>
    </section>
  );
}

export default PreviewPage;
