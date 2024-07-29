import { createFederatedIdentity } from "./FederatedIdentity/createFederatedIdentity";
import { oktaIcon } from "./FederatedIdentity/context/providedIcons";
import { ProviderData } from "./FederatedIdentity/types"
import { useIsSignedIn } from "./hooks/useIsSignedIn";
import {} from '@aws-amplify/ui-react'
import Todo from "./Todo";
import { useEffect } from "react";


function App() {

  // const myButton = React.forwardRef<HTMLButtonElement>(() => {
  //     console.log('custom button')
  //     return <button onClick={() => handleSignInWithRedirect({provider: 'Google'})}></button>
  // })

  const oktaProvider : ProviderData = {providerName: 'OktaClient', displayName: 'Okta', icon:oktaIcon}
  const {FederatedIdentity} = createFederatedIdentity({providers:['google', oktaProvider, 'google']});

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
  const [signedInState, refreshCurrentUser] = useIsSignedIn() 
  console.log(signedInState)
  useEffect(() => {
    refreshCurrentUser()
  }, [])
  
  return (
    signedInState.data ?  <Todo/> :
    <FederatedIdentity>
      <FederatedIdentity.Identities>
            <FederatedIdentity.Identities.Identity providerName="OktaClient"/>            
            <FederatedIdentity.Identities.Identity providerName="google"/>
      </FederatedIdentity.Identities>
    </FederatedIdentity>
  )
}

export default App;
