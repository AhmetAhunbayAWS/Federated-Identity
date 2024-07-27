import { withBaseElementProps } from "./helpers";
import React from "react";
import { useProviderDataContext } from "../../context/useContextFunctions";
import { handleClick } from "./helpers";
import { useHandleSignInWithRedirectContext } from "../../context/useContextFunctions";
import { GetAuthenticatorText } from "./componentHelpers";
import { FederatedIdentityElements } from "../../context/elements/definitions";
import { Text } from "@aws-amplify/ui-react";
import { ProviderDataProvider } from "../../context/ProviderDataContext";
import { socialProviderList, socialProvidersUnion } from "../../types";
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
    providerName: K;
    children?: React.ReactNode;
  }): JSX.Element;
}

export const IdentityControl : IdentityControl = (props) => {
    let { providerName: _providerName } = props;
    const {children} = props
    
    if (_providerName === undefined){
        throw new Error();
    }

    if (socialProviderList.indexOf(_providerName) > -1){
        _providerName = supportedProviderName(_providerName as socialProvidersUnion)
    }
    
    const providers = useProviderDataListContext();
    const value = providers.find(({ providerName }) => providerName === _providerName);

    console.log(value)

    if (!value) {
        throw new Error();
    }

    //TODO: pass providerName into providerDataProvider
    return (
        <ProviderDataProvider providerData={value}>
                {children ??   
                    <ListItemControlElement>
                        <ButtonControlElement>
                            <IconControlElement/>
                        </ButtonControlElement>                    
                    </ListItemControlElement>                 
                }         
        </ProviderDataProvider>
    )
}
