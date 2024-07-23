
  
function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const GetAuthenticatorText = (route: AuthenticatorRoute, provider: string) => {
    switch (route) {
        case "signIn":
            return `Sign in with ${capitalizeFirstLetter(provider)}`
        case "signUp":
            return `Sign up with ${capitalizeFirstLetter(provider)}`
    }
}

type AuthenticatorRoute = 'signIn' | 'signUp'