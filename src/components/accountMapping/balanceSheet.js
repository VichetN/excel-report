"use client";

import { useRecoilState } from "recoil";
import { groupTypeAtom, parsedDataAtom } from "@/recoils";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Fragment, useState } from "react";
import { MdEditNote } from "react-icons/md";
import cx from "classnames";
import RowClient from "./rowClient";
import RowTotal from "./rowTotal";
import RowYear from "./rowYear";
import CategoryModal from "./categoryModal";

/* eslint-disable react/jsx-key */
function Row({ rowData, handleOpenCategory }) {
  return (
    <td className="py-2">
      <div className="font-bold flex gap-2 items-center">
        {rowData?.title}
        <button
          className="hover:opacity-60"
          onClick={() => handleOpenCategory(rowData)}
        >
          <MdEditNote size={25} />
        </button>
      </div>
      <Droppable droppableId={`balanceSheet-${rowData?.id}`} type="groupType">
        {(provided1, snapshot1) => (
          <>
            <div
              ref={provided1.innerRef}
              {...provided1.droppableProps}
              className={cx("pl-4", {
                // "h-[80px]": rowData?.sub?.length <= 0,
              })}
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
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openCategory, setOpenCategory] = useState(false);

  const handleOpenCategory = (category) => {
    setSelectedCategory(category);
    setOpenCategory(true);
  };

  return (
    <>
      <CategoryModal
        dataSource={selectedCategory}
        open={openCategory}
        setOpen={setOpenCategory}
      />
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
                  <Row
                    index={i}
                    rowData={r}
                    handleOpenCategory={handleOpenCategory}
                  />
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default BalanceSheet;
