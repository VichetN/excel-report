import { selectedDragRowAtom } from "@/recoils";
import React from "react";
import { useRecoilValue } from "recoil";

function DraggingBox({ provided, data, rubric }) {
  const selectedDragRow = useRecoilValue(selectedDragRowAtom);
  return (
    <div
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      className="h-[30px]"
    >
      <div className="rounded-md w-[250px] h-[30px] relative overflow-visible ">
        <div className="px-2 py-[3px] rounded-md w-full h-full line-clamp-1 whitespace-pre-wrap bg-indigo-300/70 z-20 relative">
          {data[rubric?.source?.index][1]}
        </div>
        {selectedDragRow?.length > 1 && (
          <>
            <div className="absolute w-[25px] h-[25px] rounded-full -top-[8px] -right-[5px] overflow-hidden text-center bg-red-500 text-white z-50">
              <span className="relative">{selectedDragRow?.length}</span>
            </div>
            <div className="absolute border-2 border-double bg-indigo-100 rounded-md w-full h-full -bottom-1 -right-1 z-0" />
          </>
        )}
      </div>
    </div>
  );
}

export default DraggingBox;
