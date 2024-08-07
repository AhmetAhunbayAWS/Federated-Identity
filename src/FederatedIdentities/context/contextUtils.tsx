import { HandleSignInWithRedirectContext } from "./HandleRedirectContext";
import React from "react";
import { handleSignInWithRedirect } from "../controls/helpers";
import { ProviderData, ProviderType, socialProviderList, socialProvidersUnion } from "../types";
import { ProviderDataListContext } from "./ProviderDataListContext";
import { ProviderDataContext } from "./ProviderDataContext";
import { IconVariant } from "./elements/IconElement";


export const useHandleSignInWithRedirectContext = (): typeof handleSignInWithRedirect => {
    const context = React.useContext(HandleSignInWithRedirectContext);

    if (!context) {
      return handleSignInWithRedirect;
    }

    const hsiwr = context;

    return hsiwr;
};

export const useProviderDataContext = () => {
    const providerData = React.useContext(ProviderDataContext);
  
    if (providerData === undefined) {
      throw new Error();
    }
    return providerData;
  }
  

export const useProviderDataListContext = (): ProviderData[] => {
    const context = React.useContext(ProviderDataListContext);
  
    if (!context) {
      throw new Error('');
    }
  
    const providers = context
  
    return providers;
  };

  function supportedProviderName(provider : socialProvidersUnion) : string {
    if (provider === 'facebook') {
        return 'Facebook';
    } else if (provider === 'google') {
        return 'Google';
    } else if (provider === 'amazon') {
        return 'Amazon';
    } else if (provider === 'apple') {
        return 'Apple';
    }
    return ""
}

function supportedIcon(provider: socialProvidersUnion) : JSX.Element | IconVariant {
    if (provider === 'facebook' || provider === 'google' || provider === 'amazon' || provider === 'apple') {
        return provider;
    }
    return <></>;
}


function getSupportedProviderData(providerName: socialProvidersUnion) : ProviderData {
    return {
        displayName: supportedProviderName(providerName),
        icon: supportedIcon(providerName),
        providerName: supportedProviderName(providerName)
    }
}

function validateProviderTypes(providers: ProviderType[]): void {
    const providerNames = new Set<string>();
  
    providers.forEach((provider) => {
      const providerName = typeof provider === 'string' ? provider : provider.providerName;
  
      if (providerNames.has(providerName)) {
        throw new Error(`Duplicate provider name found: ${providerName}`);
      }
  
      providerNames.add(providerName);
    });
  }

export function toProviderData(providers: ProviderType[]): ProviderData[] {
    validateProviderTypes(providers);
    return providers.map((provider) => {
        if (socialProviderList.includes(provider as string) ) {
            return getSupportedProviderData(provider as socialProvidersUnion)
        } else {
            return provider as ProviderData;
        }
    });
}