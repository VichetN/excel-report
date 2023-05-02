import cx from "classnames";
import { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { TbSquareRoundedMinus, TbSquareRoundedPlus } from "react-icons/tb";

/* eslint-disable react/jsx-key */
function RowClient({ dataSource, groupCategoryId }) {
  const [isExpanded, setIsExpanded] = useState(true);
  return (
    <Droppable
      droppableId={`groupType-${groupCategoryId}-${dataSource?.id}`}
      type="accountTable"
    >
      {(provided, snapshot) => {
        // console.log(snapshot);
        // useEffect(() => {
        //   if (snapshot.isDraggingOver) {
        //     console.log(snapshot);
        //     setIsExpanded(true);
        //   }
        // }, [snapshot.isDraggingOver]);

        return (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <div className={cx("py-2 rounded-sm flex items-center gap-2")}>
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
            <div className={cx({ hidden: !isExpanded })}>
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
                          {Number(load?.currentYearBalance).toFixed(2)}
                        </div>
                        <div className="px-3 border">
                          {Number(load?.pastYearBalance).toFixed(2)}
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
