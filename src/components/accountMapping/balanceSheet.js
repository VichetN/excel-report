"use client";

import { useDrop } from "react-dnd";
import cx from "classnames";
import { ItemTypes, accountingTypes } from "@/constants";
import { useRecoilState, useRecoilValue } from "recoil";
import { groupTypeAtom, parsedDataAtom } from "@/recoils";
import { Draggable, Droppable } from "react-beautiful-dnd";

function DroppableType({ subType = [], handleUpdateType }) {
  const parsedData = useRecoilValue(parsedDataAtom);
  const [{ isActive }, drop] = useDrop(() => ({
    accept: ItemTypes.ROW,
    collect: (monitor) => ({
      isActive: monitor.canDrop() && monitor.isOver(),
    }),
    drop: (_item, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      handleUpdateType(parsedData?.data, _item?.rowIndex, subType?.title);
    },
  }));
  return (
    <li
      ref={drop}
      key={subType?.id}
      className={cx(
        "p-2 bg-gray-200 rounded-lg my-2 transition-all ease-in duration-150",
        {
          "outline outline-indigo-400": isActive,
        }
      )}
    >
      {subType?.title}
    </li>
  );
}

function Row({ rowData, index }) {
  return (
    <>
      <tr>
        <td className="py-2">
          {rowData?.title}
          <ul>
            {rowData?.sub?.map((load, i) => (
              <Draggable
                draggableId={`balanceSheet-${rowData?.id}-${load?.id}`}
                index={i}
                key={load?.id}
              >
                {(provided, snapshot) => (
                  <li
                    key={`${rowData?.id}-${load?.id}`}
                    className={cx("pl-4 py-2", {
                      "bg-indigo-200/60": snapshot.isDragging,
                    })}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    {load?.title}
                  </li>
                )}
              </Draggable>
            ))}
          </ul>
        </td>
      </tr>
    </>
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
      <Droppable droppableId="balanceSheet" type="accountTable">
        {(provided, snapshot) => (
          <table
            className="rounded-lg"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <tbody>
              {groupType?.map((r, i) => (
                <Row key={r?.id} index={i} rowData={r} />
              ))}
              {provided.placeholder}
            </tbody>
          </table>
        )}
      </Droppable>
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
