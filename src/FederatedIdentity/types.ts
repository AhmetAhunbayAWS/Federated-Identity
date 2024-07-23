import { FederatedIdentityElements } from "./context/elements/definitions";
import React from "react";
import { IdentitiesControl } from "./Views/Controls/IdentitiesControl";
import { handleSignInWithRedirect } from "./context/HandleRedirectContext";

const {List} = FederatedIdentityElements

export type socialProvidersUnion = 'amazon' | 'apple' | 'facebook' | 'google'
export type AuthProvider = 'Amazon' | 'Apple' | 'Facebook' | 'Google';

export const socialProviderList = [
    'amazon',
    'facebook',
    'apple',
    'google'
]

export interface FederatedIdentityInput<T extends Partial<FederatedIdentityElements>, K extends string = string>{
    elements?: T;
    providers: ProviderType<K>[];
    handleSignInWithRedirect?: typeof handleSignInWithRedirect;
}

export interface Controls<T extends Partial<FederatedIdentityElements> = FederatedIdentityElements>{
    Identities: IdentitiesControl;
}

export interface FederatedIdentity<T extends Partial<FederatedIdentityElements> = FederatedIdentityElements> {
    (): React.JSX.Element;
    Provider: (props: { children?: React.ReactNode }) => React.JSX.Element;
}

export interface ProviderData<T extends string = string> {
    displayName: string;
    icon: React.ReactNode;
    providerName: T;
}

export type ProviderType<K extends string = string> = ProviderData<K> | socialProvidersUnion;

export interface createProviderProps<T extends Partial<FederatedIdentityElements> = Partial<FederatedIdentityElements>, K extends string = string>{
    providers: ProviderType<K>[];
    handleSignInWithRedirect?: typeof handleSignInWithRedirect;
    elements?: T
}