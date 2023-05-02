"use client";

import { useRecoilState } from "recoil";
import { groupTypeAtom, parsedDataAtom } from "@/recoils";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Fragment } from "react";
import RowClient from "./rowClient";
import RowTotal from "./rowTotal";

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
                <RowClient groupCategoryId={rowData?.id} dataSource={load} />
              </div>
            )}
          </Draggable>
        ))}
      </div>
    </td>
  );
}

function BalanceSheet() {
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

      <div></div>

      <table className="w-full rounded-lg">
        <tbody>
          <tr>
            <td>
              <RowTotal />
            </td>
          </tr>
          {groupType?.map((r, i) => (
            <Droppable
              droppableId={`balanceSheet-id-${r?.id}`}
              type="groupType"
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
