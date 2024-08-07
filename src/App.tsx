import {useIsSignedIn} from './hooks/useIsSignedIn';
import Todo from "./Todo";
import { createFederatedIdentities } from './FederatedIdentities/createFederatedIdentities';
import { ProviderData } from './FederatedIdentities/types';
import { oktaIcon } from './FederatedIdentities/context/elements/IconElement';
import { forwardRef, Ref } from 'react';
import '@aws-amplify/ui-react/styles.css'
import ComposableAuthenticator from './FederatedIdentities/compoableAuthenticator';

function withForwardedRef<T, P>(Component: React.ComponentType<P>) {
  return forwardRef<T, P>((props, ref) => (
    <Component {...props} ref={ref as Ref<T>} />
  ));
}

const MyButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button style={{ backgroundColor: 'red', color:'red'}} onClick={()=>{console.log('hi')}}{...props} />
);

const buttonWithRef = withForwardedRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(MyButton)


function App() {

  // const myButton = React.forwardRef<HTMLButtonElement>(() => {
  //     console.log('custom button')
  //     return <button onClick={() => handleSignInWithRedirect({provider: 'Google'})}></button>
  // })
  const oktaProvider : ProviderData = {providerName: 'OktaClient', displayName: 'Okta', icon:oktaIcon}
  const {FederatedIdentities} = createFederatedIdentities({providers:['google', oktaProvider, 'amazon', {providerName:'hello', displayName: 'google', icon: 'google'}], elements:{Button:buttonWithRef}});
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
