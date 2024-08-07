import { ProviderData } from "../types";
import React from "react";

type ProviderDataContextProps = ProviderData | undefined

export const ProviderDataContext =
  React.createContext<ProviderDataContextProps>(undefined);

export const ProviderDataProvider = ({
    children,
    providerData,
  }: {
    children?: React.ReactNode;
    providerData: ProviderData;
  }): JSX.Element => {
  
    return (
      <ProviderDataContext.Provider value={providerData}>
        {children}
      </ProviderDataContext.Provider>
    );
  };