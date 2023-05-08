import { groupTypeAtom, parsedDataAtom, selectedDragRowAtom } from "@/recoils";
import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";

function DragDropProvider({ children }) {
  const [parsedData, setParsedData] = useRecoilState(parsedDataAtom);
  const [groupType, setGroupType] = useRecoilState(groupTypeAtom);
  const [selectedDragRow, setSelectedDragRow] =
    useRecoilState(selectedDragRowAtom);

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
    let copyParseData = [...parsedData?.data];

    if (source?.droppableId === "accountTable" && selectedDragRow?.length <= 1) {
      // update currentItem
      currentItem = copyParseData?.splice(source.index, 1)[0];
      copyParseData = [...copyParseData];

      newItem = {
        id: uuidv4(),
        accountId:
          typeof currentItem[0] !== "undefined" ? currentItem[0] : null,
        title: typeof currentItem[1] !== "undefined" ? currentItem[1] : null,
        currentYearBalance:
          typeof currentItem[2] !== "undefined" ? currentItem[2] : 0,
        pastYearBalance:
          typeof currentItem[3] !== "undefined" ? currentItem[3] : 0,
      };
    }

    if (source?.droppableId?.includes("groupType")) {
      const idData = source?.droppableId?.split("-id-");
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
    // source drag balanceSheet (category)
    if (source?.droppableId?.includes("balanceSheet")) {
      const idData = source?.droppableId?.split("-");
      const groupCategoryId = idData[1];

      // // update currentItem
      const srcCurrentCategory = copyGroupType?.find(
        (e) => e?.id === groupCategoryId
      );
      const indexCategory = groupType?.findIndex(
        (e) => e?.id === groupCategoryId
      );
      if (srcCurrentCategory) {
        const subTypes = [...srcCurrentCategory?.sub];

        newItem = subTypes?.splice(source.index, 1)[0];
        newItem = { ...newItem, id: uuidv4() };

        copyGroupType?.splice(indexCategory, 1, {
          ...srcCurrentCategory,
          sub: [...subTypes],
        });
      }
    }

    if (source?.droppableId === "accountTable" && selectedDragRow?.length > 1) {
      newItem = [];
      // add datas to newItem as Array
      newItem = copyParseData?.filter(
        (e, index) => selectedDragRow?.indexOf(index) > -1
      );
      newItem = newItem?.map((load) => ({
        id: uuidv4(),
        accountId:
          typeof load[0] !== "undefined" ? load[0] : null,
        title: typeof load[1] !== "undefined" ? load[1] : null,
        currentYearBalance: typeof load[2] !== "undefined" ? load[2] : 0,
        pastYearBalance: typeof load[3] !== "undefined" ? load[3] : 0,
      }));

      copyParseData = copyParseData?.filter(
        (e, index) => selectedDragRow?.indexOf(index) === -1
      );

      // console.log(copyParseData)

    }

    // destination
    if (destination?.droppableId?.includes("groupType")) {
      const idData = destination?.droppableId?.split("-id-");
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

        // if multi Select, else select 1 or none
        if (selectedDragRow?.length > 1 && Array.isArray(newItem)) {
          subTypeItems?.splice(destination?.index, 0, ...newItem);
        } else {
          subTypeItems?.splice(destination?.index, 0, { ...newItem });
        }

        const newSubType = { ...currentSubType, items: [...subTypeItems] };
        // replace new sub type
        subTypes?.splice(indexSubType, 1, newSubType);
        // replace groupType
        copyGroupType?.splice(indexCategory, 1, {
          ...currentCategory,
          sub: [...subTypes],
        });

        setGroupType([...copyGroupType]);
        setParsedData((prev) => ({
          ...prev,
          data: [...copyParseData],
        }));
        setSelectedDragRow([]);
      }
    }
    // destination drag balanceSheet (category)
    if (destination?.droppableId?.includes("balanceSheet")) {
      const idData = destination?.droppableId?.split("-");
      const groupCategoryId = idData[1];

      // // update currentItem
      currentCategory = copyGroupType?.find((e) => e?.id === groupCategoryId);
      const indexCategory = groupType?.findIndex(
        (e) => e?.id === groupCategoryId
      );
      if (currentCategory) {
        const subTypes = [...currentCategory?.sub];
        // replace new sub type
        subTypes?.splice(destination?.index, 0, { ...newItem });
        copyGroupType?.splice(indexCategory, 1, {
          ...currentCategory,
          sub: [...subTypes],
        });

        setGroupType([...copyGroupType]);
        setParsedData((prev) => ({
          ...prev,
          data: [...copyParseData],
        }));
      }
    }
  };
  return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>;
}

export default DragDropProvider;
