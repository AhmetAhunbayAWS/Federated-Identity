import { ProviderData } from "../types";
import React from "react";

type ListItemContextProps = ProviderData | undefined

export const ProviderSubBlockContext =
  React.createContext<ListItemContextProps>(undefined);

export const ListItemProvider = ({
    children,
    providerData,
  }: {
    children?: React.ReactNode;
    providerData: ProviderData;
  }): JSX.Element => {
  
    return (
      <ProviderSubBlockContext.Provider value={providerData}>
        {children}
      </ProviderSubBlockContext.Provider>
    );
  };