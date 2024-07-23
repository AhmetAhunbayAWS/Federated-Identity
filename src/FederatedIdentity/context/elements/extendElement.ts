import { BaseElement, ElementRefType } from "../../../amplifyUIUtils/funcs";

export type ExtendElement<
  T extends React.ComponentType,
  K = never,
  U extends React.ComponentProps<T> = React.ComponentProps<T>,
> = BaseElement<U & K, ElementRefType<T>>;