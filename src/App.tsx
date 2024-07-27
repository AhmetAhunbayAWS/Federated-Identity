import { createFederatedIdentity } from "./FederatedIdentity/createFederatedIdentity";
import { oktaIcon } from "./FederatedIdentity/context/providedIcons";
import { ProviderData } from "./FederatedIdentity/types"
import { useProviderDataContext } from "./FederatedIdentity/context/useContextFunctions";
import {} from '@aws-amplify/ui-react'

function App() {

  // const myButton = React.forwardRef<HTMLButtonElement>(() => {
  //     console.log('custom button')
  //     return <button onClick={() => handleSignInWithRedirect({provider: 'Google'})}></button>
  // })

  const oktaProvider : ProviderData = {providerName: 'OktaClient', displayName: 'Okta', icon:oktaIcon}
  const {FederatedIdentity, useHandleSignInWithRedirect} = createFederatedIdentity({providers:['google', oktaProvider, 'google']});

  const [state, handler] = useHandleSignInWithRedirect()

  const MyButton = () => {
    const {providerName} = useProviderDataContext()

    return (
      <button
        disabled={state.isLoading}
        onClick={() => {
          handler({ providerName: providerName, customState: "SignedIn with " + {providerName}});
        }}
      >Sign in with {providerName}</button>
    );
  }
//   function myCustomRender(data: ProviderData) : React.JSX.Element {
//     const {providerName, displayName} = data
//     return(
//         <div>
//             <button onClick={() => 
//                 handleSignInWithRedirect({providerName: providerName})}>
//                 Click here for {displayName} login!
//             </button>
//         </div>
//     )
// }

  return (
    <FederatedIdentity>
      <FederatedIdentity.Identities>
        {state.message ? (
          <p style={{ color: 'white' }}>{state.message}</p>
        ) : (
          <div>
              <FederatedIdentity.Identities.Identity providerName="OktaClient">
                <MyButton/>
              </FederatedIdentity.Identities.Identity>
              <FederatedIdentity.Identities.Identity providerName="google">
                <MyButton/>
              </FederatedIdentity.Identities.Identity>
          </div>
        )}    
      </FederatedIdentity.Identities>
    </FederatedIdentity>
  )
}

export default App;
