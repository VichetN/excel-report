import { companyInfoAtom } from "@/recoils";
import moment from "moment";
import React from "react";
import { useRecoilState } from "recoil";

function UpdateCompanyInfo() {
  const [companyInfo, setCompanyInfo] = useRecoilState(companyInfoAtom);

  const handleClientName = (event) => {
    let newValue = event?.target?.value;
    if (newValue?.trim() === "") {
      newValue = "[Client Name]";
    }

    setCompanyInfo((prev) => ({
      ...prev,
      clientName: newValue,
    }));
  };

  const handleDirectorName = (event) => {
    let newValue = event?.target?.value;
    if (newValue?.trim() === "") {
      newValue = "[Director Name]";
    }

    setCompanyInfo((prev) => ({
      ...prev,
      directorName: newValue,
    }));
  };

  const handleEndDate = (event) => {
    setCompanyInfo((prev) => ({
      ...prev,
      endDate: moment(event?.target?.valueAsDate),
    }));
  };

  return (
    <div>
      <h2 className="text-lg font-bold">Company info:</h2>
      <div className="w-full grid grid-cols-3 space-x-3 mt-2">
        <div>
          <label className="text-gray-600">Clent name</label>
          <input
            onChange={handleClientName}
            value={
              companyInfo?.clientName === "[Client Name]"
                ? ""
                : companyInfo?.clientName
            }
            placeholder="Client name"
            className="border border-gray-600 outline-none p-2 w-full"
          />
        </div>
        <div>
          <label className="text-gray-600">Director name</label>
          <input
            onChange={handleDirectorName}
            value={
              companyInfo?.directorName === "[Director Name]"
                ? ""
                : companyInfo?.directorName
            }
            placeholder="Director name"
            className="border border-gray-600 outline-none p-2 w-full"
          />
        </div>
        <div>
          <label className="text-gray-600">End date</label>
          <input
            type="date"
            value={companyInfo?.endDate?.format("YYYY-MM-DD")}
            onChange={handleEndDate}
            className="border border-gray-600 outline-none p-2 w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default UpdateCompanyInfo;
