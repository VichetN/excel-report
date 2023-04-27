"use client";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { RecoilRoot } from "recoil";

function ClientProvider({ children }) {
  return (
    <RecoilRoot>
      <DndProvider backend={HTML5Backend}>{children}</DndProvider>
    </RecoilRoot>
  );
}

export default ClientProvider;
