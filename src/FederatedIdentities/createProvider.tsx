import { FederatedIdentityElements } from "./context/elements/definitions";
import { ElementsProvider } from "../amplifyUIUtils/defineBaseElement";
import { createProviderProps } from "./types";
import { HandleSignInWithRedirectProvider } from "./context/HandleRedirectContext";
import { ProviderDataListProvider } from "./context/ProviderDataListContext";
import { toProviderData } from "./context/contextUtils";


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
    const providerDataList = toProviderData(providers)
    return (
      <ElementsProvider elements={elements}>
        <ProviderDataListProvider providerTypes={providerDataList}>
          <HandleSignInWithRedirectProvider customRedirect={handleSignInWithRedirect}>
            {children}
          </HandleSignInWithRedirectProvider>
        </ProviderDataListProvider>
      </ElementsProvider>
    );
  };
}