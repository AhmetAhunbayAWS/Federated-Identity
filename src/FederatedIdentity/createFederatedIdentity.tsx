import { FederatedIdentityElements } from "./context/elements/definitions";
import { FederatedIdentityInput, createProviderProps } from "./types";
//import { ActionState } from "../amplifyUIUtils/funcs";
import createProvider from "./createProvider";
import { IdentitiesControl } from "./Views/Controls/IdentitiesControl"; 

// interface useHandleSigninWithRedirectInput<K extends string = string>{
//     provider: K
//     customState?: string
// }

interface FederatedIdentity<T extends Partial<FederatedIdentityElements>> {
    (): JSX.Element;
    Provider: (props: { children?: React.ReactNode }) => React.JSX.Element;
    Identities: IdentitiesControl
}

// interface useHandleSignInWithRedirect<K extends string = string>{
// (): [state: ActionState<void | undefined>, handleAction: (...input: useHandleSigninWithRedirectInput<K>[]) => void]
// } 

export function createFederatedIdentity<T extends Partial<FederatedIdentityElements>, K extends string = string>(
    input: FederatedIdentityInput<T, K>
): {
    FederatedIdentity: FederatedIdentity<T>,
    //useHandleSignInWithRedirect?: useHandleSignInWithRedirect<K>
} {
    const {elements} = input
    const _elements = {...elements, ...FederatedIdentityElements}
    const providerProps : createProviderProps = {
        elements: _elements,
        ...input,
    };

    console.log("creating provider")
  
    const Provider = createProvider(providerProps)

    console.log("creating federated identity")

    function FederatedIdentity(): JSX.Element {
        return (
            <Provider>
                <IdentitiesControl/>
            </Provider>
        )
    }

    FederatedIdentity.Provider = Provider
    FederatedIdentity.Identities = IdentitiesControl

    // const useHandleSignInWithRedirect = () => {
    //   // Implement the custom hook logic here
    // };

    return {FederatedIdentity}
}

