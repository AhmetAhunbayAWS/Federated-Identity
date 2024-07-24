import { ProviderData } from "../types";
import React from "react";

type ProviderDataContextProps = ProviderData | undefined

export const ProviderDataContext =
  React.createContext<ProviderDataContextProps>(undefined);

export const ProviderDataProvider = ({
    children,
    value,
  }: {
    children?: React.ReactNode;
    value: ProviderData;
  }): JSX.Element => {
  
    return (
      <ProviderDataContext.Provider value={value}>
        {children}
      </ProviderDataContext.Provider>
    );
  };