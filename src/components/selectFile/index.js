"use client";

import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import cx from "classnames";
import * as XLSX from "xlsx";
import { useRecoilState } from "recoil";
import { parsedDataAtom } from "@/recoils";
import Table from "../table";
// import { make_cols } from "@/utils/excel";

function SelectFileSection() {
  const [parsedData, setParsedData] = useRecoilState(parsedDataAtom);
  const [parsedDataRecoil, setParsedDataRecoil] =
    useRecoilState(parsedDataAtom);

  useEffect(() => {
    if (parsedDataRecoil) {
      setParsedData(parsedDataRecoil);
    }
  }, [parsedDataRecoil]);

  const onDrop = useCallback(async (acceptedFiles) => {
    // Do something with the files
    const file = acceptedFiles[0];
    handleFile(file);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  function handleFile(file /*:File*/) {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      /* Update state */
      const index = data
        ?.map((a) => a.length)
        .indexOf(Math.max(...data.map((a) => a.length))); // only data have value

      setParsedDataRecoil({
        data,
        cols: [...Array(data[index]?.length)].map((_, idx) => ({ key: idx })),
      });
    };
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  }

  return (
    <section className="my-2 sm:my-4 p-4 rounded-lg shadow-xl bg-white">
      {/* <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <div className="border-2 border-indigo-300 flex justify-center text-center p-1 rounded-full w-10 h-10">
          1
        </div>
        IMPORT FILE
      </h2> */}
      <div
        {...getRootProps()}
        className={cx(
          "border-2 border-dashed border-gray-700 hover:border-gray-300 bg-gray-200 flex justify-center items-center h-24 cursor-pointer rounded-xl transition-all ease-out",
          {
            "border-4 border-gray-400 bg-gray-100 mx-4": isDragActive,
          }
        )}
      >
        <input {...getInputProps()} />

        <div className="text-center">
          {parsedData?.data && (
            <p className="text-lg">File has been selected.</p>
          )}
          <p>
            <b>Drag &apos;n&apos; drop</b> some files here, or <b>click</b> to
            select files
          </p>
        </div>
      </div>
      <div className="mt-4">
        <Table data={parsedData?.data} cols={parsedData?.cols} />
      </div>
      {/* </div> */}
    </section>
  );
}

export default SelectFileSection;
