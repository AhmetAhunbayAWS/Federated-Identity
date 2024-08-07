import React from "react";
import { handleSignInWithRedirect } from "../controls/helpers";

export const HandleSignInWithRedirectContext =
  React.createContext<typeof handleSignInWithRedirect | undefined>(undefined);

//TODO: move handleSignInWithRedirect elsewhere

export const HandleSignInWithRedirectProvider = ({
    children,
    customRedirect,
  }: {
    children?: React.ReactNode;
    customRedirect?: typeof handleSignInWithRedirect;
  }): JSX.Element => {
  
    return (
      <HandleSignInWithRedirectContext.Provider value={customRedirect}>
        {children}
      </HandleSignInWithRedirectContext.Provider>
    );
  };

