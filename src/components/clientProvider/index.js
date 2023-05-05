"use client";

import { RecoilRoot } from "recoil";
// import 'react-responsive-modal/styles.css';
import DragDropProvider from "./dragDropProvider";

function ClientProvider({ children }) {
  return (
    <RecoilRoot>
      <DragDropProvider>{children}</DragDropProvider>
    </RecoilRoot>
  );
}

export default ClientProvider;
