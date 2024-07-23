
import { socialProvidersUnion, socialProviderList, AuthProvider } from "../../types";
import { signInWithRedirect } from "aws-amplify/auth";
import React from "react";
import { BaseElement, ElementRefType } from "../../../amplifyUIUtils/funcs";




export const handleClick = <T extends string = string>(provider: T, hsiwr: typeof handleSignInWithRedirect ) => {

  const _handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {

    event.preventDefault();

    //checks whether provider is in FederatedIdentityProviders
    //TODO: sort out potentially tricky logic with having a custom provider that shares a name with existing provider?
    hsiwr({provider}) 
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

interface handleSignInWithRedirectInput<T extends string = string>{
  provider: T
  customState?: string
}

export function handleSignInWithRedirect(input: handleSignInWithRedirectInput): Promise<void>{
  const {provider} = input

  if (socialProviderList.indexOf(provider) > -1){
    return signInWithRedirect({provider: provider as AuthProvider})
  } else {
    return signInWithRedirect({provider: {
        custom: provider
    }})
  }  
}