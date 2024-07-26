
import { socialProvidersUnion, socialProviderList, AuthProvider } from "../../types";
import { signInWithRedirect } from "aws-amplify/auth";
import React from "react";
import { BaseElement, ElementRefType } from "../../../amplifyUIUtils/funcs";
import { HandleSigninWithRedirectInput } from "../../types";




export const handleClick = <T extends string = string>(providerName: T, hsiwr: typeof handleSignInWithRedirect ) => {

  const _handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {

    event.preventDefault();

    //checks whether provider is in FederatedIdentityProviders
    //TODO: sort out potentially tricky logic with having a custom provider that shares a name with existing provider?
    hsiwr({providerName}) 
  };
  
  return _handleClick
}

export function withBaseElementProps<
  T,
  K extends T | ((input: T) => T),
>(
  Target: React.ForwardRefExoticComponent<T>,
  defaultProps: K
): BaseElement<T, ElementRefType<T>> {
  const Component = React.forwardRef<ElementRefType<T>, T>((props, ref) => (
    <Target
      {...{
        ...(typeof defaultProps === 'function'
          ? defaultProps(props)
          : defaultProps),
        ...props,
      }}
      ref={ref}
    />
  ));
  Component.displayName = Target.displayName;
  return Component;
}

export function supportedProviderName(provider : socialProvidersUnion) : string {
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

export function handleSignInWithRedirect(input: HandleSigninWithRedirectInput): Promise<void>{
  const {providerName, customState} = input

  if (socialProviderList.indexOf(providerName) > -1){
    return signInWithRedirect({provider: providerName as AuthProvider, customState: customState})
  } else {
    return signInWithRedirect({provider: {
        custom: providerName
    }, customState: customState})
  }  
}