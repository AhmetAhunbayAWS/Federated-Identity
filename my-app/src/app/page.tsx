
"use client";

//import { Amplify } from 'aws-amplify';
import { signOut } from 'aws-amplify/auth';
import '@aws-amplify/ui-react/styles.css';


function AuthenticatorWithUseIsSignedIn() {
  const {FederatedIdentities} = createFederatedIdentities({providers: []});
  const signedInState = useIsSignedIn();
  return signedInState.data ? (
    <button
      onClick={() => {
        signOut();
      }}
    >
      Sign out
    </button>
  ) : (
    <FederatedIdentities/>
  );
}

import RootLayout from './layout';

export default function Page() {
  return (
    <RootLayout>
        <AuthenticatorWithUseIsSignedIn />
    </RootLayout>
  );
}