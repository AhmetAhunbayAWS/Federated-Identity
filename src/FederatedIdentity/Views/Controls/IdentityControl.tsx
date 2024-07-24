import { withBaseElementProps } from "./helpers";
import React from "react";
import { useProviderDataContext } from "../../context/useContextFunctions";
import { handleClick } from "./helpers";
import { useHandleSignInWithRedirectContext } from "../../context/useContextFunctions";
import { GetAuthenticatorText } from "./componentHelpers";
import { FederatedIdentityElements } from "../../context/elements/definitions";
import { Text } from "@aws-amplify/ui-react";
import { ProviderDataProvider } from "../../context/ProviderDataContext";
import { ProviderData, socialProviderList, socialProvidersUnion } from "../../types";
import { supportedProviderName } from "./helpers";
import { useProviderDataListContext } from "../../context/useContextFunctions";

const {Button, Icon, ListItem} = FederatedIdentityElements

const ListItemControlElement : typeof ListItem = React.forwardRef(
    function _ListItemControlElement({
        children,
        ...props
    }, ref) {
        console.log("ListItemControl")
        return (            
            <ListItem ref={ref} {...props} >
                {children}
            </ListItem>
        )
    }
)

export const ButtonControlElement: typeof Button = React.forwardRef(
    function ButtonElement({ children, ...props }, ref) {
        // button handler logic here, e.g. onClick
        console.log("ButtonControlElement")

        const providerData = useProviderDataContext()
        const {providerName, displayName} = providerData

        const handleSignInWithRedirect = useHandleSignInWithRedirectContext()

        const onClick = handleClick(providerName, handleSignInWithRedirect)

        return (
            <Button onClick={onClick} {...props} ref={ref} >
                {children ?? <IconControlElement/>}
                <Text as="span">{GetAuthenticatorText('signIn', displayName)}</Text>
            </Button>
        );
    }
);

const IdentityIcon = withBaseElementProps(Icon, {
    className: `"amplify-icon federated-sign-in-icon"`,
});

export const IconControlElement : typeof Icon = React.forwardRef(

    function IdentityProvidersIcon(
        {...props},
        ref
    ) {
        const providerData = useProviderDataContext()
        const Icon = providerData?.icon
        const hasProps = Object.keys(props).length > 0;

        if (!hasProps && React.isValidElement(Icon)){
                return <IdentityIcon {...Icon.props} ref={ref}/>;
        }

        return <IdentityIcon {...props} ref={ref}/>;
    }  
)

export interface IdentityControl<
  T extends Partial<FederatedIdentityElements> = FederatedIdentityElements,
  K extends string = string
> {
  (props: {
    provider: K;
    children?: React.ReactNode;
  }): JSX.Element;
  ListItem: T['ListItem'];
  Button: T['Button'];
  Icon: T['Icon'];
  Provider: ({ children, value, }: {
    children?: React.ReactNode;
    value: ProviderData;
}) => JSX.Element
}

export const IdentityControl : IdentityControl = (props) => {
    let { provider} = props
    const {children} = props
    console.log('IdentityControl')
    console.log({provider})
    
    if (provider === undefined){
        throw new Error();
    }

    if (socialProviderList.indexOf(provider) > -1){
        provider = supportedProviderName(provider as socialProvidersUnion)
    }
    
    const providers = useProviderDataListContext();
    const value = providers.find(({ providerName }) => providerName === provider);

    if (!value) {
        throw new Error();
    }

    return (
        <ProviderDataProvider value={value}>
                {children ??
                    <ListItemControlElement>
                        <p>hi</p>
                        {/* <ButtonControlElement>
                           <IconControlElement/>
                        </ButtonControlElement> */}
                    </ListItemControlElement>
                }         
        </ProviderDataProvider>
    )
}

IdentityControl.Button = ButtonControlElement
IdentityControl.Icon = IconControlElement
IdentityControl.ListItem = ListItemControlElement
IdentityControl.Provider = ProviderDataProvider