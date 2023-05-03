"use client";

import { useRecoilState } from "recoil";
import { groupTypeAtom, parsedDataAtom } from "@/recoils";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Fragment } from "react";
import RowClient from "./rowClient";
import RowTotal from "./rowTotal";
import RowYear from "./rowYear";

/* eslint-disable react/jsx-key */
function Row({ rowData }) {
  return (
    <td className="py-2">
      <b>{rowData?.title}</b>
      <Droppable
        droppableId={`balanceSheet-id-${rowData?.id}`}
        type="groupType"
      >
        {(provided1, snapshot1) => (
          <>
            <div
              className="pl-4 "
              ref={provided1.innerRef}
              {...provided1.droppableProps}
            >
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
                      <RowClient
                        groupCategoryId={rowData?.id}
                        dataSource={load}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided1.placeholder}
            </div>
          </>
        )}
      </Droppable>
      <div>
        <RowTotal subGroup={rowData?.sub} />
      </div>
    </td>
  );
}

function BalanceSheet() {
  const [groupType, setGroupType] = useRecoilState(groupTypeAtom);

  return (
    <div className="border border-gray-400 rounded-xl p-2">
      <div>
        <h2 className="uppercase font-bold">Balance Sheet</h2>
      </div>

      <table className="w-full rounded-lg">
        <tbody>
          <tr>
            <td>
              <RowYear />
            </td>
          </tr>
          {groupType?.map((r, i) => (
            <Fragment key={r?.id}>
              <tr>
                <Row index={i} rowData={r} />
              </tr>
            </Fragment>
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
