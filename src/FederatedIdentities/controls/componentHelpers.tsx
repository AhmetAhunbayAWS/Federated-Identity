

export const GetAuthenticatorText = (route: AuthenticatorRoute, provider: string) => {
    switch (route) {
        case "signIn":
            return `Sign in with ${provider}`
        case "signUp":
            return `Sign up with ${provider}`
    }
}

type AuthenticatorRoute = 'signIn' | 'signUp'