import React from "react";
import { FederatedIdentityElements } from "../../context/elements/definitions";
import { ProviderData } from "../../types";
import { useProviderDataListContext } from "../../context/useContextFunctions";
import { IdentityControl } from "./IdentityControl";

const {List} = FederatedIdentityElements

interface RenderIdentity{(data: ProviderData) : React.JSX.Element}

// function renderIdentity(data: ProviderData) : React.JSX.Element {
//     const {providerName, displayName} = data
//     return(
//         <div>
//             <Button onClick={() => signInWithRedirect({provider: providerName as AuthProvider})}>Click here for {displayName} login!</Button>
//         </div>
//     )
// }


export interface IdentitiesControl<
  T extends Partial<FederatedIdentityElements> = FederatedIdentityElements
> {
  (props: ChildrenProps | RenderIdentityProps): JSX.Element;
  Identity: IdentityControl<T>;
}

interface ChildrenProps {
  children?: React.ReactNode;
  renderIdentity?: never;
}

interface RenderIdentityProps {
  children?: never;
  renderIdentity?: RenderIdentity;
}

export const IdentitiesControl : IdentitiesControl = (props) => {
    const providers = useProviderDataListContext()
    //get provider data and pass into renderListItem
    //ref is being created and passed in here

    const {children} = props

    // if (children & renderListItem)

  return (
    <List>
        {children ?? providers.map((provider) => (
            // renderListItem ?
            //      (renderListItem(provider)) : 
                (<IdentityControl key = {provider.providerName} providerName={provider.providerName}/>)
        ))}
    </List>
  );
}

IdentitiesControl.Identity = IdentityControl