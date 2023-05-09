"use client";

import { activeStepAtom } from "@/recoils";
import { useRecoilValue } from "recoil";
import SelectFileSection from "../selectFile";
import AccountMapping from "../accountMapping";
import Reports from "../reports";
import PreviewPage from "../preview";

function StepSection() {
  const activeStep = useRecoilValue(activeStepAtom);

  if (activeStep?.id === 1) return <SelectFileSection />;
  if (activeStep?.id === 2) return <AccountMapping />;
  if (activeStep?.id === 3) return <Reports />;
  if (activeStep?.id === 4) return <PreviewPage />;
  return null;
}

export default StepSection;
