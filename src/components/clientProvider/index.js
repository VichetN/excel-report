"use client";

import { DragDropContext } from "react-beautiful-dnd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { RecoilRoot } from "recoil";

function ClientProvider({ children }) {
  const onDragEnd = () => {};
  return (
    <RecoilRoot>
      <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>
    </RecoilRoot>
  );
}

export default ClientProvider;
