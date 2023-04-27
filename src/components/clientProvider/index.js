"use client";

import { RecoilRoot } from "recoil";

function ClientProvider({ children }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}

export default ClientProvider;
