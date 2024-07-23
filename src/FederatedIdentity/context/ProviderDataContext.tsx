import React from 'react';
import { ProviderData, ProviderType } from '../types';
import { toProviderData } from './useContextFunctions';

export const ProviderDataContext =
  React.createContext<ProviderData[] | undefined>(undefined);

export const ProviderDataProvider = ({
  children,
  providerTypes,
}: {
  children?: React.ReactNode;
  providerTypes: ProviderType[];
}): JSX.Element => {
  const providerData : ProviderData[] = toProviderData(providerTypes)

  return (
    <ProviderDataContext.Provider value={providerData}>
      {children}
    </ProviderDataContext.Provider>
  );
};