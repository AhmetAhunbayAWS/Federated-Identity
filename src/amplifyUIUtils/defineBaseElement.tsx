import React from 'react';
import {
  BaseElement,
  BaseElementProps,
  ElementDisplayName,
  ElementRefType,
  ReactElementProps,
  ReactElementType,
} from './funcs';

/**
 * @internal @unstable
 */
export interface Elements
  extends Partial<Record<ElementDisplayName, React.ComponentType>> {}

export const ElementsContext = React.createContext<Elements | undefined>(
  undefined
);

/**
 * @internal @unstable
 *
 * `ElementsProvider` provides the values contained in `ElementsContext`
 * to its `children`. `ElementsContext` lookup is handled directly
 * by `BaseElement`components returned by `defineBaseElement`.
 *
 * @example
 *
 * Add `ElementsContext` aware `BaseElement` components to a Connected
 * Component
 *
 * ```tsx
 * // `BaseElement`, renders custom or default element defintion
 * const ViewElement = defineBaseElement({
 *   displayName: "View",
 *   type: "div",
 * });
 *
 * // `BaseElement` components to be provided through `ElementsContext`
 * interface ConnectedComponentElements {
 *   View: typeof ViewElement;
 * }
 *
 * function createConnectedComponent<T extends ConnectedComponentElements>(
 *   elements?: T
 * ) {
 *   const Provider = ({ children }: { children?: React.ReactNode }) => (
 *     <ElementsProvider elements={elements}>
 *       <Children />
 *     </ElementsProvider>
 *   );
 *
 *   function ConnectedComponent() {
 *     return (
 *       <Provider>
 *         <ConnectedComponentContent />
 *       </Provider>
 *     );
 *   }
 *
 *   ConnectedComponent.Provider = Provider;
 *
 *   return ConnectedComponent;
 * }
 * ```
 */
export function ElementsProvider<T extends Elements>({
  elements,
  ...props
}: {
  children?: React.ReactNode;
  elements?: T;
}): React.JSX.Element {
  return <ElementsContext.Provider {...props} value={elements} />;
}


/**
 * @internal @unstable
 */
export interface DefineBaseElementInput<T> {
  /**
   * `BaseElement` display name in React dev tools and stack traces
   */
  displayName: ElementDisplayName;

  /**
   * base HTML `element` type
   */
  type: T;
}

/**
 * @internal @unstable
 *
 * Defines a `ElementsContext` aware `BaseElement` UI component of the
 * provided `type` with an assigned `displayName`.
 *
 * If `BaseElement` is used as a child of an `ElementsProvider`, returns the
 * `BaseElement` value of the provided `displayName` of `ElementsContext`.
 *
 * When used outside of a  parent `ElementsProvider` or no `BaseElement`
 * of `displayName` is found in the `ElementsContext`, returns a stateless,
 * unstyled HTML element of the provided `type`.
 *
 * @param {DefineBaseElementInput} input `BaseElement` parameters
 * @returns {BaseElement} `ElementsContext` aware UI component
 */
export default function defineBaseElement<
  // element type
  T extends ReactElementType,
  // string union of base element props to include
  K extends keyof U = never,
  // variant string union
  V = string,
  // available props of base element type
  U extends ReactElementProps<T> = ReactElementProps<T>,
  // control element props
  P extends BaseElementProps<K, V, U> = BaseElementProps<K, V, U>,
>(input: DefineBaseElementInput<T>): BaseElement<P, ElementRefType<P>> {
  const { displayName, type } = input;

  const Element = React.forwardRef<ElementRefType<P>, P>(
    ({ variant, ...props }, ref) => {
      const Element = React.useContext(ElementsContext)?.[displayName];

      if (Element) {
        
        // only pass `variant` to provided `Element` values
        return <Element {...{ ...props, ref, variant }} />;
      }

      return React.createElement(type, { ...props, ref });
    }
  );

  Element.displayName = displayName;

  return Element;
}
