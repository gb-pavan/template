"use client";

import { ReactNode, createContext, useContext } from "react";
import  store  from "../store/store";

const StoreContext = createContext({ store });

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  return (
    <StoreContext.Provider value={{ store }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
