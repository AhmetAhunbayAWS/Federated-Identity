import defineBaseElement from "../../../amplifyUIUtils/defineBaseElement";
import { IconElement } from "./IconElement";

export interface FederatedIdentityElements {
    Button: typeof ButtonElement;
    List: typeof ListElement;
    ListItem: typeof ListItemElement;
    Icon: typeof IconElement;
    Group: typeof GroupElement;
    Text: typeof TextElement;
}

type ButtonElementProps = 'onClick' | 'type';
export const ButtonElement = defineBaseElement<'button', ButtonElementProps>({
  type: 'button',
  displayName: 'Button',
});

export const ListElement = defineBaseElement({
    type: 'ul',
    displayName: 'UnorderedList',
});

export const ListItemElement = defineBaseElement({
    type: 'li',
    displayName: 'ListItem',
}); 

export const GroupElement = defineBaseElement({
    type: 'div',
    displayName: 'UnorderedList',
})

export const TextElement = defineBaseElement({
  type: 'span',
  displayName: 'Text',
});

export const FederatedIdentityElements: FederatedIdentityElements = {
  Button: ButtonElement,
  List: ListElement,
  ListItem: ListItemElement,
  Icon: IconElement,
  Group: GroupElement,
  Text: TextElement,
}