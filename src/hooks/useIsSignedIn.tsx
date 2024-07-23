import { Hub } from 'aws-amplify/utils';
import { useEffect, useState } from 'react';
import { HubCallback } from '@aws-amplify/core'
import { getCurrentUser } from 'aws-amplify/auth';


function useIsSignedIn() {
    console.log("called hook")
  
    const [isSigned, setIsSigned] = useState<boolean>(false)
  
    useEffect(() => {
      getCurrentUser()
        .then(() => {
          setIsSigned(true);
        })
        .catch(() => {
          setIsSigned(false);
        });
      console.log("getCurrentUser called")
    }, [])
    

    useEffect(() => {
      //code that runs upon every state change, side effect
      console.log("Hub event called")
      const listener : HubCallback = ({ payload } ) => {
        console.log("hub payload:")
        console.log(payload)
        if (payload.event === 'signedIn'){
            setIsSigned(true)
        } else if (payload.event === 'signedOut'){
            setIsSigned(false)
        }
      }
  
  
      const unmount = Hub.listen('auth', listener);
        
      return () => {
        unmount();
        console.log("unmounted hub listener")
      };
  
    }, [] ); //dependency array. when empty component wont unmount. Maybe because this is never rerendered?
    
    return isSigned
}

export default useIsSignedIn