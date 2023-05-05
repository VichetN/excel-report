import cx from "classnames";
import { useRef, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { TbSquareRoundedMinus, TbSquareRoundedPlus } from "react-icons/tb";
import { CiEdit } from "react-icons/ci";
import { BsCheckCircle } from "react-icons/bs";
import { RiCloseCircleFill } from "react-icons/ri";
import { useSetRecoilState } from "recoil";
import { updateGroupTypeSelector } from "@/recoils";

function TItleType({ dataSource, isExpanded, setIsExpanded, groupCategoryId }) {
  const inputRef = useRef();
  const [isEditMode, setIsEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(dataSource?.title || "");

  const setUpdateGroupType = useSetRecoilState(updateGroupTypeSelector);

  const totalCurrentYear = dataSource?.items?.reduce(
    (acc, curr) => acc + (curr?.currentYearBalance || 0),
    0
  );
  const totalPastYear = dataSource?.items?.reduce(
    (acc, curr) => acc + (curr?.pastYearBalance || 0),
    0
  );

  const handleInput = (e) => {
    setInputValue(e?.target?.value);
  };

  const handleEditButton = () => {
    const newValue = inputValue?.trim();
    if (!isEditMode || newValue === "") {
      setIsEditMode(true);
      return;
    }

    setUpdateGroupType({
      title: newValue,
      groupCategoryId: groupCategoryId,
      groupTypeId: dataSource?.id,
    });

    setIsEditMode(false);
  };

  const handleClose = () => {
    setIsEditMode(false);
    setInputValue(dataSource?.title);
  };

  // useClickAway(() => {
  //   if (isEditMode) {
  //     setIsEditMode(false);
  //     setInputValue(dataSource?.title);
  //   }
  // }, inputRef);

  return (
    <div className={cx("rounded-sm flex group")} ref={inputRef}>
      <div className={cx("flex flex-1 items-center gap-2")}>
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
        )}
        <div>
          {isEditMode && (
            <input
              className="border px-1 border-gray-700 rounded-md"
              value={inputValue}
              onChange={handleInput}
            />
          )}
          {!isEditMode && dataSource?.title}
        </div>
        <button onClick={handleEditButton}>
          {isEditMode && <BsCheckCircle className="text-green-600" size={22} />}
          {!isEditMode && <CiEdit size={22} />}
        </button>
        {isEditMode && (
          <button onClick={handleClose}>
            <RiCloseCircleFill className="text-red-600" size={25} />
          </button>
        )}
      </div>

      <div
        className={cx("w-[300px] grid grid-cols-2", {
          hidden: isExpanded,
        })}
      >
        <div className="px-3 border">
          {Number(totalCurrentYear || 0).toFixed(2)}
        </div>
        <div className="px-3 border">
          {Number(totalPastYear || 0).toFixed(2)}
        </div>
      </div>
    </div>
  );
}

/* eslint-disable react/jsx-key */
function RowClient({ dataSource, groupCategoryId }) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Droppable
      droppableId={`groupType-id-${groupCategoryId}-id-${dataSource?.id}`}
      type="accountTable"
    >
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cx({
              "pb-4 mt-2": isExpanded,
            })}
          >
            <TItleType
              dataSource={dataSource}
              isExpanded={isExpanded}
              setIsExpanded={setIsExpanded}
              groupCategoryId={groupCategoryId}
            />
            <div className={cx("my-2 ", { hidden: !isExpanded })}>
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
