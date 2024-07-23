import React from "react";
import { Text } from "@aws-amplify/ui-react";
import { ButtonElement, FederatedIdentityElements, IconElement,  } from "../../context/elements/definitions";
import { supportedProviderName, handleClick } from "./helpers";
import { GetAuthenticatorText } from "./componentHelpers";
import { ProviderData, socialProviderList, socialProvidersUnion } from "../../types";
import { ProviderSubBlockContext } from "../../context/ListItemContext";
import {withBaseElementProps} from "./helpers";
import { useProviderData, useProviderSubBlockContext, useHandleSignInWithRedirectContext } from "../../context/useContextFunctions";

const {Button, Icon, ListItem, List} = FederatedIdentityElements

interface renderListItem{(data: ProviderData) : React.JSX.Element}

export interface ProviderSubBlock<
  T extends Partial<FederatedIdentityElements> = FederatedIdentityElements,
  K extends string = string
> {
  (props: {
    provider?: K;
    children?: React.ReactNode;
  }): JSX.Element;
  ListItem: T['ListItem'];
  Button: T['Button'];
  Icon: T['Icon'];
}

export const ProviderSubBlock : ProviderSubBlock = (props) => {
    let { provider} = props
    const {children} = props

    if (provider === undefined){
        throw new Error();
    }

    if (socialProviderList.indexOf(provider) > -1){
        provider = supportedProviderName(provider as socialProvidersUnion)
    }
    
    const providers = useProviderData();
    const value = providers.find(({ providerName }) => providerName === provider);

    if (!value) {
        throw new Error();
    }

    return (
        <ProviderSubBlockContext.Provider value={value}>
            <p key={value.providerName} style={{ color: 'white' }}>{value.providerName}</p>
                {children ??
                    <ListItem>
                        <ButtonControlElement>
                           <IconControlElement/>
                        </ButtonControlElement>
                    </ListItem>
                }         
        </ProviderSubBlockContext.Provider>
    )
}

// const ListItemControlElement = withBaseElementProps(ListItem, {})

// export const ListItemControlElement : typeof ListItemElement = React.forwardRef(
//     function ListItemControlElement({
//         children,
//         ...props
//     }, ref) {
//         return (            
//             <ListItemElement ref={ref} {...props} >
//                 {children}
//             </ListItemElement>
//         )
//     }
// )

const IdentityIcon = withBaseElementProps(Icon, {
    className: `"amplify-icon federated-sign-in-icon"`,
});

export const IconControlElement : typeof Icon = React.forwardRef(

    function IdentityProvidersIcon(
        {...props},
        ref
    ) {
        const providerData = useProviderSubBlockContext()
        const Icon = providerData?.icon
        const hasProps = Object.keys(props).length > 0;

        if (!hasProps && React.isValidElement(Icon)){
                return <IdentityIcon {...Icon.props} ref={ref}/>;
        }

        return <IdentityIcon {...props} ref={ref}/>;
    }  
)

export const ButtonControlElement: typeof Button = React.forwardRef(
    function ButtonElement({ children, ...props }, ref) {
        // button handler logic here, e.g. onClick

        const providerData = useProviderSubBlockContext()
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

 ProviderSubBlock.Button = ButtonElement
 ProviderSubBlock.Icon = IconElement
ProviderSubBlock.ListItem = ListItem      

export interface IdentitiesControl<
  T extends Partial<FederatedIdentityElements> = FederatedIdentityElements,
  // Button, Icon are ControlElemnts
> {
  (props: {
    renderListItem?: renderListItem;
  }): JSX.Element;
  ProviderSubBlock: ProviderSubBlock<T>
  List: T['List']
}

export const IdentitiesControl : IdentitiesControl = (props) => {
    const providers = useProviderData()
    //get provider data and pass into renderListItem
    //ref is being created and passed in here

    //const {renderListItem} = props

  return (
    <List>
        {providers.map((provider) => (
            <ProviderSubBlock key = {provider.providerName} provider={provider.providerName}/>
        ))}
    </List>
  );
}

IdentitiesControl.ProviderSubBlock = ProviderSubBlock
IdentitiesControl.List = List

