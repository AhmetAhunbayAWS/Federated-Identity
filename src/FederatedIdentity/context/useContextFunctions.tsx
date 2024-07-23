import { HandleSignInWithRedirectContext } from "./HandleRedirectContext";
import React from "react";
import { handleSignInWithRedirect } from "../Views/Controls/helpers";
import { ProviderData, ProviderType, socialProviderList, socialProvidersUnion } from "../types";
import { ProviderDataContext } from "./ProviderDataContext";
import { GoogleIcon, FacebookIcon, AmazonIcon, AppleIcon } from "./providedIcons";
import { ProviderSubBlockContext } from "./ListItemContext";


export const useHandleSignInWithRedirectContext = (): typeof handleSignInWithRedirect => {
    const context = React.useContext(HandleSignInWithRedirectContext);

    if (!context) {
      return handleSignInWithRedirect;
    }

    const hsiwr = context;

    return hsiwr;
};

export const useProviderSubBlockContext = () => {
    const providerData = React.useContext(ProviderSubBlockContext);
  
    if (providerData === undefined) {
      throw new Error();
    }
    return providerData;
  }
  

export const useProviderData = (): ProviderData[] => {
    const context = React.useContext(ProviderDataContext);
  
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



function supportedIcon(provider: socialProvidersUnion) : React.ReactNode {
    let iconComponent;
          if (provider === 'facebook') {
              iconComponent = <FacebookIcon />;
          } else if (provider === 'google') {
              iconComponent = <GoogleIcon />;
          } else if (provider === 'amazon') {
              iconComponent = <AmazonIcon />;
          } else if (provider === 'apple') {
              iconComponent = <AppleIcon />;
          }
    return iconComponent;
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