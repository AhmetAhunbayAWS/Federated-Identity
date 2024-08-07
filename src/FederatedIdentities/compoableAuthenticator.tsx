import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { View, Button } from "@aws-amplify/ui-react";
import Todo from "../Todo";
//import { Scope } from "aws-cdk-lib/aws-ecs";
import { ProviderData } from "./types";
import { createFederatedIdentities } from "./createFederatedIdentities";
import { oktaIcon } from "./context/elements/IconElement";
import {
  ThemeProvider,
  Theme,
  useTheme,
} from '@aws-amplify/ui-react';

const oktaProvider : ProviderData = {providerName: 'OktaClient', displayName: 'Okta', icon:oktaIcon}
const {FederatedIdentities} = createFederatedIdentities({providers:['google', oktaProvider]});


const components = {
    
    SignIn: {
        Header() {
          return (
            <FederatedIdentities/>
          );
        },
        Footer() {
          const { toSignIn } = useAuthenticator();
    
          return (
            <View textAlign="center">
              <Button
                fontWeight="normal"
                onClick={toSignIn}
                size="small"
                variation="link"
              >
                Back to Sign In
              </Button>
            </View>
          );
        },
      },
  };
  
  export default function ComposableAuthenticator() {

  const { tokens } = useTheme();
  const theme: Theme = {
    name: 'Auth Example Theme',
    tokens: {
      components: {
        authenticator: {
          router: {
            boxShadow: `0 0 16px ${tokens.colors.overlay['10']}`,
            borderWidth: '0',
          },
          form: {
            padding: `0 ${tokens.space.xl} ${tokens.space.medium}`,            
          },
        },
      },
    },
  };
// .Auth?.Cognito.loginWith?.oauth?.providers
  return (
    <ThemeProvider theme={theme}>
      
        <Authenticator components={components} socialProviders={[]}>
          <Todo/>
        </Authenticator>
      
    </ThemeProvider>
  );
}


