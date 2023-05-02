import { groupTypeAtom, parsedDataAtom } from "@/recoils";
import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";

function DragDropProvider({ children }) {
  const [parsedData, setParsedData] = useRecoilState(parsedDataAtom);
  const [groupType, setGroupType] = useRecoilState(groupTypeAtom);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    let currentItem, currentCategory, newItem;
    let copyGroupType = [...groupType];

    if (source?.droppableId === "accountTable") {
      console.log("accountable");
      let copyParseData = [...parsedData?.data];

      // update currentItem
      currentItem = copyParseData?.splice(source.index, 1)[0];
      copyParseData = [...copyParseData];

      newItem = {
        id: uuidv4(),
        title: typeof currentItem[1] !== "undefined" ? currentItem[1] : null,
        currentYearBalance:
          typeof currentItem[2] !== "undefined" ? currentItem[2] : 0,
        pastYearBalance:
          typeof currentItem[3] !== "undefined" ? currentItem[3] : 0,
      };
    }

    if (source?.droppableId?.includes("groupType")) {
      console.log("groupType");
      const idData = source?.droppableId?.split("-");
      const groupCategoryId = idData[1];
      const groupTypeId = idData[2];

      // find dragging category & type
      const srcCurrentCategory = copyGroupType?.find(
        (e) => e?.id === groupCategoryId
      );
      const indexCategory = groupType?.findIndex(
        (e) => e?.id === groupCategoryId
      );
      if (srcCurrentCategory) {
        const subTypes = [...srcCurrentCategory?.sub];
        const currentSubType = subTypes?.find((e) => e?.id === groupTypeId);
        const indexSubType = subTypes?.findIndex((e) => e?.id === groupTypeId);

        let subTypeItems = [...(currentSubType?.items || [])];
        newItem = subTypeItems?.splice(source.index, 1)[0];
        newItem = { ...newItem, id: uuidv4() };

        const newSubType = { ...currentSubType, items: [...subTypeItems] };

        // replace new sub type
        subTypes?.splice(indexSubType, 1, newSubType);
        // replace groupType
        copyGroupType?.splice(indexCategory, 1, {
          ...srcCurrentCategory,
          sub: [...subTypes],
        });
      }
    }

    if (destination?.droppableId?.includes("groupType")) {
      console.log({ source, destination });
      const idData = destination?.droppableId?.split("-");
      const groupCategoryId = idData[1];
      const groupTypeId = idData[2];

      // find groupType
      currentCategory = copyGroupType?.find((e) => e?.id === groupCategoryId);
      const indexCategory = groupType?.findIndex(
        (e) => e?.id === groupCategoryId
      );
      if (currentCategory) {
        const subTypes = [...currentCategory?.sub];
        const currentSubType = subTypes?.find((e) => e?.id === groupTypeId);
        const indexSubType = subTypes?.findIndex((e) => e?.id === groupTypeId);

        let subTypeItems = [...(currentSubType?.items || [])];

        subTypeItems?.splice(destination?.index, 0, { ...newItem });
        const newSubType = { ...currentSubType, items: [...subTypeItems] };

        // replace new sub type
        subTypes?.splice(indexSubType, 1, newSubType);
        // replace groupType
        copyGroupType?.splice(indexCategory, 1, {
          ...currentCategory,
          sub: [...subTypes],
        });

        setGroupType([...copyGroupType]);
      }
    }

    // let add,
    //   active = todos,
    //   completed = completedTodos;

    // if (source.droppableId === "TodosList") {
    //   add = active.splice(source.index, 1)[0];
    //   active = [...active];
    // } else {
    //   add = completed.splice(source.index, 1)[0];
    //   completed = [...completed];
    // }

    // if (destination.droppableId === "TodosList") {
    //   active.splice(destination.index, 0, { ...add, isDone: false });
    // } else {
    //   completed.splice(destination.index, 0, { ...add, isDone: true });
    // }
  };
  return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>;
}

export default DragDropProvider;
