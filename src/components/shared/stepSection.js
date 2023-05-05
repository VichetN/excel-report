"use client";

import { activeStepAtom } from "@/recoils";
import { useRecoilValue } from "recoil";
import SelectFileSection from "../selectFile";
import AccountMapping from "../accountMapping";
import Reports from "../reports";

function StepSection() {
  const activeStep = useRecoilValue(activeStepAtom);

  if (activeStep?.id === 1) return <SelectFileSection />;
  if (activeStep?.id === 2) return <AccountMapping />;
  return <Reports />;
}

export default StepSection;
