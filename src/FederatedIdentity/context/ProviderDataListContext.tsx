import React from 'react';
import { ProviderData, ProviderType } from '../types';
import { toProviderData } from './useContextFunctions';

export const ProviderDataListContext =
  React.createContext<ProviderData[] | undefined>(undefined);

export const ProviderDataListProvider = ({
  children,
  providerTypes,
}: {
  children?: React.ReactNode;
  providerTypes: ProviderType[];
}): JSX.Element => {
  const providerData : ProviderData[] = toProviderData(providerTypes)

  return (
    <ProviderDataListContext.Provider value={providerData}>
      {children}
    </ProviderDataListContext.Provider>
  );
};