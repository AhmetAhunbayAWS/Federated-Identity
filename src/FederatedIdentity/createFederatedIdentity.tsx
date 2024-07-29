import { FederatedIdentityElements } from "./context/elements/definitions";
import { CreateFederatedIdentityInput } from "./types";
//import { ActionState } from "../amplifyUIUtils/funcs";
import createProvider from "./createProvider";
import { IdentitiesControl } from "./Views/Controls/IdentitiesControl"; 
import { UseHandleSignInWithRedirect } from "./types";
import useHandleSigninWithRedirect from "../hooks/UseHandleSignInWithRedirect";

// interface useHandleSigninWithRedirectInput<K extends string = string>{
//     provider: K
//     customState?: string
// }

interface FederatedIdentity<T extends FederatedIdentityElements = FederatedIdentityElements> {
    (input: {
        children?: React.ReactNode
    }): JSX.Element;
    Identities: IdentitiesControl<T>
}

// interface useHandleSignInWithRedirect<K extends string = string>{
// (): [state: ActionState<void | undefined>, handleAction: (...input: useHandleSigninWithRedirectInput<K>[]) => void]
// } 

export function createFederatedIdentity<
    T extends Partial<FederatedIdentityElements>, 
    K extends string = string
    >(input: CreateFederatedIdentityInput<T, K>): {
    FederatedIdentity: FederatedIdentity,
    useHandleSignInWithRedirect: UseHandleSignInWithRedirect<K>
} {
  
    const Provider = createProvider(input)

    function FederatedIdentity(input: {children?: React.ReactNode}): JSX.Element {
        const {children} = input
        return (            
            <Provider>
                {children ??
                    <IdentitiesControl/>
                }
            </Provider>
        )
    }


    FederatedIdentity.Identities = IdentitiesControl

    return {FederatedIdentity, useHandleSignInWithRedirect: useHandleSigninWithRedirect}
}



