import { HandleSignInWithRedirectContext } from "./HandleRedirectContext";
import React from "react";
import { handleSignInWithRedirect } from "../Views/Controls/helpers";
import { ProviderData, ProviderType, socialProviderList, socialProvidersUnion } from "../types";
import { ProviderDataListContext } from "./ProviderDataListContext";
import { GoogleIcon, FacebookIcon, AmazonIcon, AppleIcon } from "./providedIcons";
import { ProviderDataContext } from "./ProviderDataContext";


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

function supportedIcon(provider: socialProvidersUnion) : JSX.Element {
        if (provider === 'facebook') {
            return FacebookIcon;
        } else if (provider === 'google') {
        return GoogleIcon;
        } else if (provider === 'amazon') {
        return AmazonIcon;
        } else if (provider === 'apple') {
        return AppleIcon;
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

export function toProviderData(providers: ProviderType[]): ProviderData[] {
    return providers.map((provider) => {
        if (socialProviderList.includes(provider as string) ) {
            return getSupportedProviderData(provider as socialProvidersUnion)
        } else {
            return provider as ProviderData;
        }
    });
}