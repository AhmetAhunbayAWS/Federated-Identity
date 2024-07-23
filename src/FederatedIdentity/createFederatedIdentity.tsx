import { FederatedIdentityElements } from "./context/elements/definitions";
import { FederatedIdentityInput, createProviderProps } from "./types";
//import { ActionState } from "../amplifyUIUtils/funcs";
import { Controls } from "./types";
import createProvider from "./createProvider";
import IdentityView from "./Views/IdentitiesView";
import { IdentitiesControl } from "./Views/Controls/IdentitiesControl"; 

// interface useHandleSigninWithRedirectInput<K extends string = string>{
//     provider: K
//     customState?: string
// }

interface FederatedIdentity<T extends Partial<FederatedIdentityElements>> {
    (): JSX.Element;
    Provider: (props: { children?: React.ReactNode }) => React.JSX.Element;
    IdentityView: () => JSX.Element;
    Controls: Controls<T>
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

    // eslint-disable-next-line no-debugger
    debugger;

    console.log("creating provider")
  
    const Provider = createProvider(providerProps)

    console.log("creating federated identity")

    function FederatedIdentity(): JSX.Element {
        return (
            <Provider>
                <IdentityView/>
            </Provider>
        )
    }

    const Controls: Controls<T> = {
        Identities: IdentitiesControl,
    }

    FederatedIdentity.Provider = Provider
    FederatedIdentity.IdentityView = IdentityView
    FederatedIdentity.Controls = Controls

    // const useHandleSignInWithRedirect = () => {
    //   // Implement the custom hook logic here
    // };

    return {FederatedIdentity}
}

