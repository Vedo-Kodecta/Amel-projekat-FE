"use client";
import React, { createContext, useContext, ReactNode } from "react";
import {
  getAvailableFunctions,
  deleteState,
  removeVariant,
  addVariant,
  activate,
} from "./api";

interface StateMachineProps {
  getAvailableFunctions: (productId: number) => Promise<any>;
  deleteState: (productId: number) => Promise<any>;
  removeVariant: (productId: number, variantId: number) => Promise<any>;
  addVariant: (productId: number, variant: AddVariant) => Promise<any>;
  activate: (productId: number) => Promise<any>;
}

const StateMachineContext = createContext<StateMachineProps | undefined>(
  undefined
);

export const StateMachineProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <StateMachineContext.Provider
      value={{
        getAvailableFunctions,
        deleteState,
        removeVariant,
        addVariant,
        activate,
      }}
    >
      {children}
    </StateMachineContext.Provider>
  );
};

export const useStateMachineApi = () => {
  const context = useContext(StateMachineContext);
  if (!context) {
    throw new Error(
      "useStateMachineApi must be used within an StateMachineProvider"
    );
  }
  return context;
};
