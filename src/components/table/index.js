import cx from "classnames";
import React, { useEffect } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

function Row({ rowData, cols, index }) {
  // const [{ isDragging }, drag, dragPreview] = useDrag(
  //   () => ({
  //     type: ItemTypes.ROW,
  //     item: { rowIndex: index },
  //     collect: (monitor) => ({
  //       isDragging: monitor.isDragging(),
  //     }),
  //   }),
  //   []
  // );

  return (
    <Draggable draggableId={`draggable-${index}`} index={index}>
      {(provided, snapshot) => (
        <tr
          // ref={drag}
          className={cx("", { "bg-indigo-200/60": snapshot.isDragging })}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
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
