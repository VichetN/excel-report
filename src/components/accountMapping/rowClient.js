import cx from "classnames";
import { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { TbSquareRoundedMinus, TbSquareRoundedPlus } from "react-icons/tb";

/* eslint-disable react/jsx-key */
function RowClient({ dataSource, groupCategoryId }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const totalCurrentYear = dataSource?.items?.reduce(
    (acc, curr) => acc + curr?.currentYearBalance,
    0
  );
  const totalPastYear = dataSource?.items?.reduce(
    (acc, curr) => acc + curr?.pastYearBalance,
    0
  );

  console.log(dataSource)

  return (
    <Droppable
      droppableId={`groupType-id-${groupCategoryId}-id-${dataSource?.id}`}
      type="accountTable"
    >
      {(provided, snapshot) => {
        return (
          <div ref={provided.innerRef} {...provided.droppableProps} className={cx({
            "pb-4 mt-2": isExpanded
          })}>
            <div
              className={cx("rounded-sm flex ", {
                // "py-2": isExpanded,
              })}
            >
              <div
                className={cx("flex flex-1 items-center gap-2", {
                  // border: !isExpanded,
                })}
              >
                {!isExpanded ? (
                  <TbSquareRoundedPlus
                    size={22}
                    className="cursor-pointer"
                    onClick={() => setIsExpanded((prev) => !prev)}
                  />
                ) : (
                  <TbSquareRoundedMinus
                    size={22}
                    className="cursor-pointer"
                    onClick={() => setIsExpanded((prev) => !prev)}
                  />
                )}{" "}
                {dataSource?.title}
              </div>

              <div
                className={cx("w-[300px] grid grid-cols-2", {
                  hidden: isExpanded,
                })}
              >
                <div className="px-3 border">
                  {Number(totalCurrentYear).toFixed(2)}
                </div>
                <div className="px-3 border">
                  {Number(totalPastYear).toFixed(2)}
                </div>
              </div>
            </div>
            <div className={cx("my-2 ",{ hidden: !isExpanded })}>
              {dataSource?.items?.map((load, index) => (
                <Draggable
                  draggableId={`clientData-${groupCategoryId}-${dataSource?.id}-${load?.id}`}
                  index={index}
                  key={`${groupCategoryId}-${dataSource?.id}-${load?.id}`}
                >
                  {(provided1, snapshot1) => (
                    <div
                      className={cx("pl-8 w-full flex", {
                        // hidden: snapshot.isDragging,
                      })}
                      key={`${groupCategoryId}-${dataSource?.id}-${load?.id}`}
                      {...provided1.draggableProps}
                      {...provided1.dragHandleProps}
                      ref={provided1.innerRef}
                    >
                      <div className="px-3 flex-1 border">{load?.title}</div>
                      <div className="w-[300px] grid grid-cols-2">
                        <div className="px-3 border">
                          {Number(load?.currentYearBalance || 0).toFixed(2)}
                        </div>
                        <div className="px-3 border">
                          {Number(load?.pastYearBalance || 0).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          </div>
        );
      }}
    </Droppable>
  );
}

export default RowClient;
