import { companyInfoAtom } from "@/recoils";
import moment from "moment";
import React from "react";
import { useRecoilValue } from "recoil";

/* eslint-disable react/no-unescaped-entities */
function DirectorReport() {
  const companyInfo = useRecoilValue(companyInfoAtom);
  return (
    <div className="w-[21cm] border py-2 shadow-lg">
      <div className=" px-6 my-4">
        <h1 className="font-bold text-xl">Directors' Report</h1>

        <p className="mt-4 text-justify">
          The directors submit herewith their report together with the audited
          financial statements in accordance with the Small and Medium-sized
          Entity Financial Reporting Standard (SME-FRS) for the year ended {moment(companyInfo?.endDate).format("DD MMMM YYYY")}.
        </p>
      </div>

      <hr />

      <div className="my-4 mx-6">
        <h2 className="font-bold ">Principal activity</h2>
        <p className="mt-4 text-justify">
          The principal activity of the Company is trading.
        </p>
      </div>

      <hr />

      <div className="my-4 mx-6">
        <h2 className="font-bold ">Permitted indemnity provision</h2>
        <p className="mt-4 text-justify">
          At no time during the financial year were there any permitted
          indemnity provisions in force for the benefit of the directors of the
          Company.
        </p>
      </div>

      <hr />

      <div className="my-4 mx-6">
        <h2 className="font-bold ">Management contracts</h2>
        <p className="mt-4 text-justify">
          No contracts concerning the management and administration of the whole
          or any substantial part of the business of the Company were entered
          into or existed during the year.
        </p>
      </div>

      <hr />
      <div className="my-4 mx-6">
        <h2 className="font-bold ">Business review</h2>
        <p className="mt-4 text-justify">
          The Company falls within reporting exemption for the financial year.
          Accordingly, the Company is exempted from preparing a business review.
        </p>
      </div>

      <hr />
      <div className="my-4 mx-6">
        <h2 className="font-bold ">Share capital</h2>
        <p className="mt-4 text-justify">
          Details of the movements in share capital of the Company during the
          year are set out in the notes to the financial statements.
        </p>
      </div>

      <hr />
      <div className="my-4 mx-6">
        <h2 className="font-bold ">Debentures</h2>
        <p className="mt-4 text-justify">
          The Company has not issued any debentures during the year.
        </p>
      </div>

      <hr />
      <div className="my-4 mx-6">
        <h2 className="font-bold ">Directors</h2>
        <p className="mt-4 text-justify">
          The directors during the financial year were:
          <br />
          <b>{companyInfo?.directorName}</b>
        </p>
      </div>

      <hr />
      <div className="my-4 mx-6">
        <h2 className="font-bold ">Dividends</h2>
        <p className="mt-4 text-justify">
          The directors do not recommend the payment of dividend for the
          financial year.
        </p>
      </div>

      <hr />
      <div className="my-4 mx-6">
        <h2 className="font-bold ">Approval of directors' report </h2>
        <p className="mt-4 text-justify">
          This report was approved by the board of directors on 28 April 2023.
        </p>
      </div>

      {/* footer */}
      <hr />
      <div className="my-8 mx-6">
        <p className="text-justify">On behalf of the Board</p>
        <p className="text-justify font-bold">{companyInfo?.directorName}</p>
      </div>
    </div>
  );
}

export default DirectorReport;
