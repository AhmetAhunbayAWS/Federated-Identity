import { withBaseElementProps } from "./helpers";
import React from "react";
import { useProviderDataContext } from "../context/contextUtils";
import { useHandleSignInWithRedirectContext } from "../context/contextUtils";
import { GetAuthenticatorText } from "./componentHelpers";
import { FederatedIdentityElements } from "../context/elements/definitions";
import { ProviderDataProvider } from "../context/ProviderDataContext";
import { socialProviderList, socialProvidersUnion } from "../types";
import { supportedProviderName, handleClick } from "./helpers";
import { useProviderDataListContext } from "../context/contextUtils";
import { ForwardRefExoticComponent } from "react";
import { IconVariant } from "../context/elements/IconElement";
import { CLASS_BASE } from "../constants";

const {Button, Icon, ListItem, Text} = FederatedIdentityElements

export const ListItemControlElement : typeof ListItem = withBaseElementProps(ListItem, {
    className: `${CLASS_BASE}__list__item no-hover`,
    style: {display: 'inline-block', margin: 0, padding: 0 }
})

export const ButtonControlElement: typeof Button = React.forwardRef(
    function ButtonElement({ children, ...props }, ref) {
        // button handler logic here, e.g. onClick

        const providerData = useProviderDataContext()
        const {providerName, displayName} = providerData

        const handleSignInWithRedirect = useHandleSignInWithRedirectContext()

        const onClick = handleClick(providerName, handleSignInWithRedirect)

        return (
            <Button 
                onClick={onClick} 
                className={`${CLASS_BASE}__button amplify-button amplify-field-group__control federated-sign-in-button`} 
                ref={ref}
                style={{
                    'gap': '1rem',
                    width: '100%',
                    height: '100%',                    
                }}
                {...props} 
                >
                {children ?? <IconControlElement/>}
                <Text className="amplify-text">{GetAuthenticatorText('signIn', displayName)}</Text>
            </Button>
        );
    }
);

export const IconControlElement : typeof Icon = React.forwardRef(
    function IdentityProvidersIcon(
        {...props},
        ref
    ) {
        const providerData = useProviderDataContext()
        const icon = providerData?.icon
        //const providerName = providerData?.providerName
        const hasProps = Object.keys(props).length > 0;

        if (!hasProps){
            if (socialProviderList.includes(icon as string)){
                const iconVariant = icon as IconVariant
                return (<Icon className={`${CLASS_BASE}__icon amplify-icon federated-sign-in-icon`} variant={iconVariant}/>)
            } else if (React.isValidElement(icon)){
                return React.cloneElement(icon)
            }
        }

        return (
            <Icon {...props} ref={ref}/>
        )
    }  
);

interface IdentityProps<T extends string = string> extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    providerName: T 
}

export interface IdentityControl<T extends string = string> extends ForwardRefExoticComponent<IdentityProps<T>>{}

export const IdentityControl: IdentityControl = React.forwardRef<HTMLButtonElement, IdentityProps>(
    function Identity({ providerName, ...props }, ref) {

        let _providerName = providerName
        const {children} = props
        
        if (_providerName === undefined){
            throw new Error();
        }

        if (socialProviderList.indexOf(_providerName) > -1){
            _providerName = supportedProviderName(_providerName as socialProvidersUnion)
        }
        
        const providers = useProviderDataListContext();
        console.log(providers)
        const value = providers.find(({ providerName }) => providerName === _providerName);

        if (!value) {
            throw new Error();
        }
        console.log(props.key)

        return (
            <ProviderDataProvider providerData={value}>
                <ListItemControlElement key = {`${value.providerName}_list_item`}>
                    <ButtonControlElement key = {`${value.providerName}_button`} ref={ref} {...props}>
                        {children ??
                            <IconControlElement key = {`${value.providerName}_icon`}/>
                        }
                    </ButtonControlElement>
                </ListItemControlElement>
            </ProviderDataProvider>
        );
    }
)