"use client";

import cx from "classnames";
import { useRecoilState } from "recoil";
import { groupTypeAtom, parsedDataAtom } from "@/recoils";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Fragment } from "react";

// function DroppableType({ subType = [], handleUpdateType }) {
//   const parsedData = useRecoilValue(parsedDataAtom);
//   const [{ isActive }, drop] = useDrop(() => ({
//     accept: ItemTypes.ROW,
//     collect: (monitor) => ({
//       isActive: monitor.canDrop() && monitor.isOver(),
//     }),
//     drop: (_item, monitor) => {
//       const didDrop = monitor.didDrop();
//       if (didDrop) {
//         return;
//       }
//       handleUpdateType(parsedData?.data, _item?.rowIndex, subType?.title);
//     },
//   }));
//   return (
//     <li
//       ref={drop}
//       key={subType?.id}
//       className={cx(
//         "p-2 bg-gray-200 rounded-lg my-2 transition-all ease-in duration-150",
//         {
//           "outline outline-indigo-400": isActive,
//         }
//       )}
//     >
//       {subType?.title}
//     </li>
//   );
// }

/* eslint-disable react/jsx-key */

function Row({ rowData }) {
  return (
    <td className="py-2">
      <b>{rowData?.title}</b>
      <div className="pl-4 ">
        {rowData?.sub?.map((load, i) => (
          <Draggable
            draggableId={`balanceSheet-${rowData?.id}-${load?.id}`}
            index={i}
            key={`${rowData?.id}-${load?.id}`}
          >
            {(provided, snapshot) => (
              <div
                key={`${rowData?.id}-${load?.id}`}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
              >
                <div
                  className={cx("px-4 py-2 rounded-sm", {
                    "bg-indigo-200/60": snapshot.isDragging,
                  })}
                >
                  {load?.title}
                </div>

                {[...Array(3)].map((_, index) => (
                  <div
                    className={cx("pl-8 w-full flex", {
                      // hidden: snapshot.isDragging,
                    })}
                    key={index}
                  >
                    <div className="px-3 flex-1 border">Salary</div>
                    <div className="w-[400px] grid grid-cols-2">
                      <div className="px-3 border">
                        {Number(400).toFixed(2)}
                      </div>
                      <div className="px-3 border">
                        {Number(420).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Draggable>
        ))}
      </div>
    </td>
  );
}

function BalanceSheet() {
  const [parsedData, setParsedData] = useRecoilState(parsedDataAtom);
  const [groupType, setGroupType] = useRecoilState(groupTypeAtom);

  // const handleUpdateType = (data, rowIndex, type) => {
  //   const copyData = [...parsedData?.data];

  //   const currentItem = copyData?.[rowIndex];
  //   const newItem = [...currentItem, type];

  //   copyData?.splice(rowIndex, 1, newItem); // update to data array

  //   setParsedData((prev) => ({
  //     cols: [...prev?.cols],
  //     data: [...copyData],
  //   }));
  // };
  return (
    <div className="border border-gray-400 rounded-xl p-2">
      <div>
        <h2 className="uppercase font-bold">Balance Sheet</h2>
      </div>

      <table className="w-full rounded-lg">
        <tbody>
          {groupType?.map((r, i) => (
            <Droppable
              droppableId={`balanceSheet-id-${r?.id}`}
              type="accountTable"
            >
              {(provided, snapshot) => (
                <Fragment key={r?.id}>
                  <tr ref={provided.innerRef} {...provided.droppableProps}>
                    <Row index={i} rowData={r} />
                  </tr>
                  {provided.placeholder}
                </Fragment>
              )}
            </Droppable>
          ))}
        </tbody>
      </table>

      {/* <div ref={provided.innerRef} {...provided.droppableProps}>
            {groupType?.map((load) => (
              <div key={load.id}>
                <h2 className="font-bold py-2">{load?.title}</h2>
              </div>
            ))}
            {provided.placeholder}
          </div> */}
    </div>
  );
}

export default BalanceSheet;
