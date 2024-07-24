import React from "react";
import { FederatedIdentityElements } from "../../context/elements/definitions";
import { AuthProvider, ProviderData } from "../../types";
import { useProviderDataListContext } from "../../context/useContextFunctions";
import { signInWithRedirect } from "aws-amplify/auth";
import { IdentityControl } from "./IdentityControl";
import { render } from "react-dom";

const {Button, List} = FederatedIdentityElements

interface renderListItem{(data: ProviderData) : React.JSX.Element}

function renderListItem(data: ProviderData) : React.JSX.Element {
    const {providerName, displayName} = data
    return(
        <div>
            <Button onClick={() => signInWithRedirect({provider: providerName as AuthProvider})}>Click here for {displayName} login!</Button>
        </div>
    )
}

export interface IdentitiesControl<
  T extends Partial<FederatedIdentityElements> = FederatedIdentityElements,
  // Button, Icon are ControlElemnts
> {
  (props: {
    children?: React.ReactNode
    renderListItem?: renderListItem;
  }): JSX.Element;
  Identity: IdentityControl<T>
  List: T['List']
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
                (<IdentityControl key = {provider.providerName} provider={provider.providerName}/>)
        ))}
    </List>
  );
}

IdentitiesControl.Identity = IdentityControl
IdentitiesControl.List = List
