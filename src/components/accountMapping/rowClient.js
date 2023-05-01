import cx from "classnames";
import { Draggable, Droppable } from "react-beautiful-dnd";

const fakeData = [
  {
    id: "1",
    title: "Salary",
  },
  {
    id: "2",
    title: "Salary",
  },
];

/* eslint-disable react/jsx-key */
function RowClient({ dataSource, groupCategoryId }) {
  return (
    <Droppable
      droppableId={`groupType-${groupCategoryId}-${dataSource?.id}`}
      type="accountTable"
    >
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <div
            className={cx("px-4 py-2 rounded-sm", {
              "bg-indigo-200/60": snapshot.isDragging,
            })}
          >
            {dataSource?.title}
          </div>
          {fakeData.map((load, index) => (
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
                  <div className="w-[400px] grid grid-cols-2">
                    <div className="px-3 border">{Number(400).toFixed(2)}</div>
                    <div className="px-3 border">{Number(420).toFixed(2)}</div>
                  </div>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default RowClient;
