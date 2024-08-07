import {useIsSignedIn} from './hooks/useIsSignedIn';
import Todo from "./Todo";
import { createFederatedIdentities } from './FederatedIdentities/createFederatedIdentities';
import { ProviderData } from './FederatedIdentities/types';
import { oktaIcon } from './FederatedIdentities/context/elements/IconElement';
import { forwardRef, Ref } from 'react';
import '@aws-amplify/ui-react/styles.css'
import ComposableAuthenticator from './FederatedIdentities/compoableAuthenticator';


const myButton = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  function Button({ children, onClick, ...props }, ref) {
    return(
      <button style={{backgroundColor:'blue'}} onClick = {()=>{console.log('hi')}}ref={ref}{...props}>{children}</button>
    )
  }
)

const myIcon = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  function Svg({ children,viewBox, ...props }, ref) {
    return(
      <svg ref={ref}viewBox='0 0 1024 1024'{...props}>{children}</svg>
    )
  }
)


function App() {

  // const myButton = React.forwardRef<HTMLButtonElement>(() => {
  //     console.log('custom button')
  //     return <button onClick={() => handleSignInWithRedirect({provider: 'Google'})}></button>
  // })
  const oktaProvider : ProviderData = {providerName: 'OktaClient', displayName: 'Okta', icon:oktaIcon}
  const {FederatedIdentities} = createFederatedIdentities({providers:['google', oktaProvider, 'amazon', {providerName:'hello', displayName: 'google', icon: 'google'}], elements:{Button: myButton, Icon: myIcon}});
  const signedInState = useIsSignedIn()
  
//   function myCustomRender(data: ProviderData) : React.JSX.Element {
//     const {providerName, displayName} = data
//     return(
//         <div>
//             <Button onClick={() => 
//                 handleSignInWithRedirect({providerName: providerName})}>
//                 Click here for {displayName} login!
//             </Button>
//         </div>
//     )
// }

  return(
    signedInState.isLoading ? <p>loading</p> :
    signedInState.data ? <Todo/> :
    <div>
      <FederatedIdentities/>
      <ComposableAuthenticator/>
    </div>
  )
}

export default App;
