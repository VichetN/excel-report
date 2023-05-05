import React from "react";

function AuditorReport() {
  return (
    <div className="w-[21cm] px-6 py-3 border shadow-lg">
      <div className="text-xl font-bold">
        <h1>Independent auditor’s report to the member of</h1>
        <h1>Client Company Limited</h1>
        <h1>(Incorporated in Hong Kong with limited liability)</h1>
      </div>

      <div className="mt-6">
        <h2 className="font-bold ">Opinion</h2>
        <p className="mt-4 text-justify">
          We have audited the financial statements of Client Company Limited
          (“the Company”), which comprise the statement of financial position as
          at 31 March 2021, and the income statement for the year then ended,
          and notes to the financial statements, including a summary of
          significant accounting policies.
        </p>

        <p className="mt-4 text-justify">
          In our opinion, the financial statements of the Company are prepared,
          in all material respects, in accordance with the Hong Kong Small and
          Medium-sized Entity Financial Reporting Standard (“SME-FRS”) issued by
          the Hong Kong Institute of Certified Public Accountants (“HKICPA”) and
          have been properly prepared in compliance with the Hong Kong Companies
          Ordinance.
        </p>
      </div>

      <div className="mt-6">
        <h2 className="font-bold ">Basis for Opinion</h2>
        <p className="mt-4 text-justify">
          We conducted our audit in accordance with Hong Kong Standards on
          Auditing (“HKSAs”) and with reference to Practice Note 900 (Revised)
          “Audit of Financial Statements Prepared in Accordance with the Small
          and Medium-sized Entity Financial Reporting Standard” issued by the
          HKICPA. Our responsibilities under those standards are further
          described in the Auditor’s Responsibilities for the Audit of the
          Financial Statements section of our report. We are independent of the
          Company in accordance with the HKICPA’s Code of Ethics for
          Professional Accountants (“the Code”), and we have fulfilled our other
          ethical responsibilities in accordance with the Code. We believe that
          the audit evidence we have obtained is sufficient and appropriate to
          provide a basis for our opinion.
        </p>
      </div>

      <div className="mt-6">
        <h2 className="font-bold ">
          Material Uncertainty Related to Going Concern
        </h2>
        <p className="mt-4 text-justify">
          The financial statements have been prepared on a going concern basis,
          the validity of which depends upon future funding being available and
          obtainable from the Company’s present financing shareholders (also
          directors) so concerned. The financial statements do not include any
          adjustments that would result from a failure to obtain such funding.
          Details of the circumstances relating to this material uncertainty are
          described in note 2(a) to the financial statements. We consider that
          appropriate estimates and disclosures have been made and our opinion
          is not qualified in this respect.
        </p>
      </div>
    </div>
  );
}

export default AuditorReport;
