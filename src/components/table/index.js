import { ItemTypes } from "@/constants";
import cx from "classnames";
import React, { useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

function Row({ rowData, cols, index }) {
  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: ItemTypes.ROW,
      item: { rowIndex: index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    []
  );

  //   useEffect(() => {
  //     dragPreview(getEmptyImage(), { captureDraggingState: true });
  //   }, []);

  return (
    <tr ref={drag} className={cx("", { "opacity-50": isDragging })}>
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
              <Row key={i} rowData={r} index={i} cols={cols} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
