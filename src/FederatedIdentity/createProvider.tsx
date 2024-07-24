import { FederatedIdentityElements } from "./context/elements/definitions";
import { ElementsProvider } from "../amplifyUIUtils/defineBaseElement";
import { createProviderProps } from "./types";
import { ProviderDataListProvider } from "./context/ProviderDataListContext";
import { HandleSignInWithRedirectProvider } from "./context/HandleRedirectContext";


// interface CreateFederatedIdentityInput<T> {
//     elements?: T;

// }

export default function createProvider<
  T extends Partial<FederatedIdentityElements>,
>({elements, providers, handleSignInWithRedirect} : createProviderProps<T>){

  return function Provider({
    children,
  }: {
    children?: React.ReactNode;
  }): React.JSX.Element {
    return (
        <ElementsProvider elements={elements}>
            <ProviderDataListProvider providerTypes={providers}>
                <HandleSignInWithRedirectProvider customRedirect={handleSignInWithRedirect}>
                    {children}
                </HandleSignInWithRedirectProvider>
            </ProviderDataListProvider>
        </ElementsProvider>
    );
  };
}