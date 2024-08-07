import { FederatedIdentityElements } from "./context/elements/definitions";
import { CreateFederatedIdentityInput } from "./types";
//import { ActionState } from "../amplifyUIUtils/funcs";
import createProvider from "./createProvider";
import { UseHandleSignInWithRedirect } from "./types";
import useHandleSigninWithRedirect from "../hooks/UseHandleSignInWithRedirect";
import { forwardRef } from "react";
import { ProviderDataProvider } from "./context/ProviderDataContext";
import { IdentityControl } from "./controls/IdentityControl";
import { toProviderData } from "./context/contextUtils";
import React from "react";
import { ProviderData } from "./types";
import { ForwardRefExoticComponent } from "react";
import { CLASS_BASE } from "./constants";
import { withBaseElementProps } from "./controls/helpers";

const {Group} = FederatedIdentityElements

interface RenderIdentity<T extends string = string>{(data: ProviderData<T>) : React.JSX.Element}

interface ChildrenProps {
  children?: React.ReactNode;
  renderIdentity?: never;
}

interface RenderIdentityProps<T extends string = string> {
  children?: never;
  renderIdentity: RenderIdentity<T>;
}

export interface IdentitiesControl extends ForwardRefExoticComponent<FederatedIdentitiesProps>{
  Identity: IdentityControl;
}

export type FederatedIdentitiesProps<T extends string = string> = (ChildrenProps | RenderIdentityProps<T>) & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

// export const GroupControlElement: typeof Group = React.forwardRef(
//     function GroupControlElement({children, ...props}, ref) {
//       return (
//         <Group {...props} ref={ref} aria-roledescription="group">
//           {children}
//         </Group>
//       )
//     }
//   )
const GroupControlElement: typeof Group = withBaseElementProps(Group, {
  className: `amplify-flex federated-sign-in-container ${CLASS_BASE}__group`,
  "aria-roledescription": 'group',
  "aria-label": 'Federated Identities Button Group',
  style: {'flexDirection': 'column', 'padding': 'var(--amplify-components-authenticator-form-padding)'}
})


export function createFederatedIdentities<
    T extends Partial<FederatedIdentityElements>, 
    K extends string = string
    >(input: CreateFederatedIdentityInput<T, K>): {
    FederatedIdentities: IdentitiesControl,
    useHandleSignInWithRedirect: UseHandleSignInWithRedirect<K>
} {
    const Provider = createProvider(input)
    const providerDataList = toProviderData(input.providers)

    const forwardedRef = forwardRef<HTMLDivElement, FederatedIdentitiesProps>(
      function Identities({ children, renderIdentity, ...props }, ref) {
        return (
          <Provider>   
            <div style={{boxSizing: 'border-box', display: 'grid'}}>
              <div 
                style={{
                  borderColor: 'var(--amplify-components-authenticator-router-border-color)',
                  borderWidth: 'var(--amplify-components-authenticator-router-border-width)',
                  borderStyle: 'var(--amplify-components-authenticator-router-border-style)',
                  backgroundColor: "var(--amplify-colors-background-primary)",
                  width: 'var(--amplify-components-authenticator-container-width-max)',
                  placeSelf: 'center'
                }}                
              >
                <GroupControlElement ref={ref} {...props}>
                  {children ?? providerDataList.map((provider) => (
                    renderIdentity ?
                      (renderIdentity(provider)) : 
                      (<ProviderDataProvider providerData={provider}>
                      {children ??   
                          <IdentityControl 
                            key = {'Identity_' + provider.providerName} 
                            providerName={provider.providerName}
                          />               
                      }         
                      </ProviderDataProvider>)
                  ))}
                </GroupControlElement>                         
              </div>
            </div>
          </Provider>
        );
      }
    )
      
    const IdentitiesControl = {
        ...forwardedRef,
        Identity: IdentityControl
    } as IdentitiesControl

    return {FederatedIdentities: IdentitiesControl, useHandleSignInWithRedirect: useHandleSigninWithRedirect}
}