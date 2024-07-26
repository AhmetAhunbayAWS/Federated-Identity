import { FederatedIdentityElements } from "./context/elements/definitions";
import React from "react";
import { IdentitiesControl } from "./Views/Controls/IdentitiesControl";
import { handleSignInWithRedirect } from "./Views/Controls/helpers";

const {List} = FederatedIdentityElements

export type socialProvidersUnion = 'amazon' | 'apple' | 'facebook' | 'google'
export type AuthProvider = 'Amazon' | 'Apple' | 'Facebook' | 'Google';

export const socialProviderList = [
    'amazon',
    'facebook',
    'apple',
    'google'
]

export interface CreateFederatedIdentityInput<T extends Partial<FederatedIdentityElements>, K extends string = string>{
    elements?: T;
    providers: ProviderType<K>[];
    handleSignInWithRedirect?: typeof handleSignInWithRedirect;
}

export interface ProviderData<T extends string = string> {
    displayName: string;
    icon: React.ReactNode;
    providerName: T;
}

export type ProviderType<K extends string = string> = ProviderData<K> | socialProvidersUnion;

export interface createProviderProps<T, K extends string = string>{
    providers: ProviderType<K>[];
    handleSignInWithRedirect?: typeof handleSignInWithRedirect;
    elements?: T
}

export interface HandleSigninWithRedirectInput<K extends string = string> {
    providerName: K;
    customState?: string;
}

interface ActionState<T> {
    data: T;
    isLoading: boolean;
    message: string | undefined;
}

export interface UseHandleSignInWithRedirect<K extends string = string> {
    (): [
        state: ActionState<void | undefined>,
        handleAction: (...input: HandleSigninWithRedirectInput<K>[]) => void,
    ];
}