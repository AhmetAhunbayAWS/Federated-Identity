import { createFederatedIdentity } from "./FederatedIdentity/createFederatedIdentity";
import myIconSrc from "./assets/oktaClient.svg";

function App() {
  const oktaIcon = <img src={myIconSrc} alt="My Icon" className="amplify-icon federated-sign-in-icon"/>
  // const isSignedIn = useIsSignedIn()
  const {FederatedIdentity} = createFederatedIdentity({providers:['google',{providerName: 'OktaClient', displayName: 'Okta', icon: oktaIcon}]});

  return (
    <FederatedIdentity.Provider>
      <FederatedIdentity.Identities>
        <FederatedIdentity.Identities.List>
          <FederatedIdentity.Identities.Identity provider="google">
          </FederatedIdentity.Identities.Identity>
        </FederatedIdentity.Identities.List>
      </FederatedIdentity.Identities>
    </FederatedIdentity.Provider>
  )
}

export default App;
