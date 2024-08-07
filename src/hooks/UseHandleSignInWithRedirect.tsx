import { signInWithRedirect } from "aws-amplify/auth";
import useDataState from "./UseDataState";
import { HandleSigninWithRedirectInput } from "../FederatedIdentities/types";
import { handleSignInWithRedirect } from "../FederatedIdentities/controls/helpers";


//import { AuthProviders } from "aws-amplify/datastore";
type SignInWithRedirectOutput = Awaited<ReturnType<typeof signInWithRedirect>>;


async function _signInWithRedirectAction(
  _: SignInWithRedirectOutput,
  input: HandleSigninWithRedirectInput
): Promise<SignInWithRedirectOutput> {

  const result = await handleSignInWithRedirect(input)
  return result;
}

export const useHandleSigninWithRedirect = () =>
    useDataState(_signInWithRedirectAction, undefined)

export default useHandleSigninWithRedirect