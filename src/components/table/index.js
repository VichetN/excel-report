import React from "react";
import { useDrag } from "react-dnd";

function Row({ rowData, cols }) {
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: "account-map",
    item: { id: 1 },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <tr ref={drag} className="border" {...collected}>
      {cols?.map((c) => (
        <td key={c.key} className="text-sm px-2 border break-keep">
          {rowData[c.key]}
        </td>
      ))}
    </tr>
  );
}

function Table({ data = [], cols = [] }) {
  return (
    <div className="overflow-x-auto p-2 border border-gray-500 rounded-xl">
      <div className="">
        <table className="rounded-lg">
          <tbody>
            {data?.map((r, i) => (
              <Row key={i} rowData={r} cols={cols} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
