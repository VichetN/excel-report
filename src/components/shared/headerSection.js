"use client";

import { stepsData } from "@/constants";
import { activeStepAtom } from "@/recoils";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useRecoilState } from "recoil";

function HeaderSection() {
  const [activeStep, setActiveStep] = useRecoilState(activeStepAtom);

  const handleNextStep = () => {
    if (activeStep?.id === 3) {
      setActiveStep(stepsData[3]);
      return;
    }
    if (activeStep?.id === 2) {
      setActiveStep(stepsData[2]);
      return;
    }
    setActiveStep(stepsData[1]);
  };
  const handleBackStep = () => {
    if (activeStep?.id === 4) {
      setActiveStep(stepsData[2]);
      return;
    }
    if (activeStep?.id === 3) {
      setActiveStep(stepsData[1]);
      return;
    }
    if (activeStep?.id === 2) {
      setActiveStep(stepsData[0]);
      return;
    }
    setActiveStep(stepsData[0]);
  };
  return (
    <section className="flex justify-between">
      <div className="bg-white rounded-lg p-2 md:p-4 shadow-lg">
        <h2 className="text-lg md:text-2xl font-bold flex items-center gap-2 uppercase">
          <div className="border-2 border-indigo-300 flex justify-center text-center p-1 md:p-0 rounded-full w-10 h-10">
            {activeStep?.id}
          </div>
          {activeStep?.title}
        </h2>
      </div>

      <div className="flex gap-3">
        {activeStep?.id > 1 && (
          <button
            className="h-full flex justify-center gap-2 items-center bg-gray-400/60 px-3 md:px-4 font-bold rounded-lg text-lg transition-all ease-in hover:text-gray-200 hover:bg-gray-400/40"
            onClick={handleBackStep}
          >
            <AiOutlineArrowLeft size={30} />
          </button>
        )}

        {activeStep?.id < 4 && (
          <button
            className="h-full flex justify-center gap-2 items-center bg-gray-400/60 px-3 md:px-4 font-bold rounded-lg text-lg transition-all ease-in hover:text-gray-200 hover:bg-gray-400/40"
            onClick={handleNextStep}
          >
            <AiOutlineArrowRight size={30} />
          </button>
        )}
      </div>
    </section>
  );
}

export default HeaderSection;
