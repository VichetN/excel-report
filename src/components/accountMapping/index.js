"use client";

import { ItemTypes, accountingTypes } from "@/constants";
import Table from "../table";
import { useRecoilState } from "recoil";
import { parsedDataAtom } from "@/recoils";
import { useDrop } from "react-dnd";
import cx from "classnames";

function DroppableType({ subType = [], parsedData, setParsedData }) {
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
      const copyData = [...parsedData?.data];

      const currentItem = copyData?.[_item?.rowIndex];
      const newItem = [...currentItem, subType?.title];

      copyData?.splice(_item?.rowIndex, 1, newItem); // update to data array

      setParsedData((prev) => ({
        ...prev,
        data: [...copyData],
      }));
    },
  }));
  return (
    <li
      ref={drop}
      key={subType?.id}
      className={cx(
        "p-2 bg-gray-200 rounded-lg my-2 transition-all ease-in duration-150",
        {
          "opacity-50 outline outline-indigo-400": isActive,
        }
      )}
    >
      {subType?.title}
    </li>
  );
}

function AccountMapping() {
  const [parsedData, setParsedData] = useRecoilState(parsedDataAtom);
  return (
    <section className="my-2 sm:my-4 p-4 rounded-lg shadow-xl bg-white">
      <div className="flex gap-4">
        <div className="w-[250px] border border-gray-400 rounded-xl p-2">
          {accountingTypes?.map((load) => (
            <div key={load.id}>
              <h2 className="font-bold py-2 uppercase">{load?.title}</h2>
              <ul>
                {load?.sub?.map((load1) => (
                  <DroppableType
                    key={load?.id}
                    subType={load1}
                    parsedData={parsedData}
                    setParsedData={setParsedData}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div>
          <Table
            data={parsedData?.data}
            cols={parsedData?.cols}
            isRowDraggable
          />
        </div>
      </div>
      {/* <div className="overflow-x-auto mt-4 p-2 border border-gray-500 rounded-xl">
        <div className="">
          <table className="rounded-lg">
            <tbody>
              {parsedData?.data?.map((r, i) => (
                <tr key={i} className="border">
                  {parsedData?.cols
                    //   ?.filter((e) => Boolean(r[e.key]))
                    ?.map((c) => (
                      <td
                        key={c.key}
                        className="text-sm px-2 border break-keep"
                      >
                        {r[c.key]}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
    </section>
  );
}

export default AccountMapping;
