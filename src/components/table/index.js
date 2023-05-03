import { selectedDragRowAtom } from "@/recoils";
import cx from "classnames";
import React, { useEffect } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";

const PRIMARY_BUTTON_NUMBER = 0;

function Row({ rowData, cols, index }) {
  const [selectedDragRow, setSelectedDragRow] =
    useRecoilState(selectedDragRowAtom);

  const onKeyDown = (event, snapshot, index) => {
    // already used
    if (event.defaultPrevented) {
      return;
    }
    if (snapshot.isDragging) {
      return;
    }
    if (event.keyCode !== 13) {
      return;
    }
    // we are using the event for selection
    event.preventDefault();
    performAction(event, index);
  };

  // Using onClick as it will be correctly
  // preventing if there was a drag
  const onClick = (event, index) => {
    if (event.defaultPrevented) {
      return;
    }
    if (event.button !== PRIMARY_BUTTON_NUMBER) {
      return;
    }
    // marking the event as used
    event.preventDefault();
    performAction(event, index);
  };

  // Determines if the platform specific toggle selection in group key was used
  const wasToggleInSelectionGroupKeyUsed = (event) => {
    const isUsingWindows = navigator.platform.indexOf("Win") >= 0;
    return isUsingWindows ? event.ctrlKey : event.metaKey;
  };

  // Determines if the multiSelect key was used
  const wasMultiSelectKeyUsed = (event) => event.shiftKey;

  function performAction(event, index) {
    // const { task, toggleSelection, toggleSelectionInGroup, multiSelectTo } =
    //   snapshot;

    if (wasToggleInSelectionGroupKeyUsed(event)) {
      setSelectedDragRow((prev) => [...prev, index]);
      return;
    }

    // if (wasMultiSelectKeyUsed(event)) {
    //   console.log("2");
    //   // multiSelectTo(task.id);
    //   return;
    // }
    setSelectedDragRow([index]);
    // toggleSelection(task.id);
  }

  return (
    <Draggable draggableId={`draggable-${index}`} index={index}>
      {(provided, snapshot) => {
        // if (snapshot.isDragging)
        //   return (
        //     <tr
        //       {...provided.draggableProps}
        //       {...provided.dragHandleProps}
        //       ref={provided.innerRef}
        //     >
        //       <td>
        //         <div className="px-2 py-[3px] rounded-sm w-[250px] bg-indigo-100/70 line-clamp-1">
        //           {rowData[1]}
        //         </div>
        //       </td>
        //     </tr>
        //   );
        return (
          <tr
            // ref={drag}
            className={cx("", {
              "bg-indigo-200/60": snapshot.isDragging,
              // "bg-blue-200 border-indigo-700": selectedDragRow?.includes(index),
            })}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onClick={(e) => onClick(e, index)}
            onKeyDown={(e) => onKeyDown(e, snapshot, index)}
          >
            {cols?.map((c) => (
              <td
                key={c.key}
                className={cx("text-sm px-2 border break-keep cursor-move", {
                  "bg-blue-200": selectedDragRow?.includes(index),
                })}
              >
                {rowData[c.key]}
              </td>
            ))}
          </tr>
        );
      }}
    </Draggable>
  );
}

function Table({ data = [], cols = [] }) {
  // const selectedDragRow = useRecoilValue(selectedDragRowAtom);
  return (
    <Droppable
      droppableId="accountTable"
      type="accountTable"
      // mode="virtual"
      renderClone={(provided, snapshot, rubric) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="px-2 py-[3px] rounded-md w-[250px] h-[30px] bg-indigo-100/70 line-clamp-1"
        >
          {data[rubric?.source?.index][1]}
        </div>
      )}
    >
      {(provided, snapshot) => (
        <div className="overflow-x-auto p-2 border border-gray-500 rounded-xl">
          <div className="">
            <table
              className="rounded-lg"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <tbody>
                {data?.map((r, i) => (
                  <Row key={i} rowData={r} index={i} cols={cols} />
                ))}
                {provided.placeholder}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Droppable>
  );
}

export default Table;
