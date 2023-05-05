"use client";

import { stepsData } from "@/constants";
import { activeStepAtom } from "@/recoils";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useRecoilState } from "recoil";

function HeaderSection() {
  const [activeStep, setActiveStep] = useRecoilState(activeStepAtom);

  const handleNextStep = () => {
    if (activeStep?.id === 2) {
      setActiveStep(stepsData[2]);
      return;
    }
    setActiveStep(stepsData[1]);
  };
  return (
    <section className="flex justify-between">
      <div className="bg-white rounded-lg p-2 md:p-4 shadow-lg">
        <h2 className="text-lg md:text-2xl font-bold flex items-center gap-2 uppercase">
          <div className="border-2 border-indigo-300 flex justify-center text-center p-1 rounded-full w-10 h-10">
            {activeStep?.id}
          </div>
          {activeStep?.title}
        </h2>
      </div>

      <div>
        <button
          className="h-full flex justify-center gap-2 items-center bg-gray-400/60 px-4 md:px-6 font-bold rounded-lg text-lg transition-all ease-in hover:text-gray-200 hover:bg-gray-400/40"
          onClick={handleNextStep}
        >
          NEXT <AiOutlineArrowRight />
        </button>
      </div>
    </section>
  );
}

export default HeaderSection;
