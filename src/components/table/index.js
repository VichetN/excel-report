import cx from "classnames";
import React, { useEffect } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
const PRIMARY_BUTTON_NUMBER = 0;
function Row({ rowData, cols, index }) {
  const onKeyDown = (event, snapshot) => {
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

    performAction(event);
  };

  // Using onClick as it will be correctly
  // preventing if there was a drag
  const onClick = (event) => {
    if (event.defaultPrevented) {
      return;
    }

    if (event.button !== PRIMARY_BUTTON_NUMBER) {
      return;
    }

    // marking the event as used
    event.preventDefault();

    performAction(event);
  };

  // Determines if the platform specific toggle selection in group key was used
  const wasToggleInSelectionGroupKeyUsed = (event) => {
    const isUsingWindows = navigator.platform.indexOf("Win") >= 0;
    return isUsingWindows ? event.ctrlKey : event.metaKey;
  };

  // Determines if the multiSelect key was used
  const wasMultiSelectKeyUsed = (event) => event.shiftKey;

  function performAction(event) {
    // const { task, toggleSelection, toggleSelectionInGroup, multiSelectTo } =
    //   snapshot;

    console.log(rowData);

    // if (wasToggleInSelectionGroupKeyUsed(event)) {
    //   toggleSelectionInGroup(task.id);
    //   return;
    // }

    // if (wasMultiSelectKeyUsed(event)) {
    //   multiSelectTo(task.id);
    //   return;
    // }

    // toggleSelection(task.id);
  }

  return (
    <Draggable draggableId={`draggable-${index}`} index={index}>
      {(provided, snapshot) => (
        <tr
          // ref={drag}
          className={cx("", { "bg-indigo-200/60": snapshot.isDragging })}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={onClick}
          onKeyDown={(e) => onKeyDown(e, snapshot)}
        >
          {cols?.map((c) => (
            <td
              key={c.key}
              className="text-sm px-2 border break-keep cursor-move"
            >
              {rowData[c.key]}
            </td>
          ))}
        </tr>
      )}
    </Draggable>
  );
}

function Table({ data = [], cols = [] }) {
  return (
    <Droppable droppableId="accountTable" type="accountTable">
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
