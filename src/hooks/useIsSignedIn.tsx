import { getCurrentUser } from 'aws-amplify/auth';
import useDataState from './UseDataState';

async function _useIsSignedIn(
  __: boolean,
  _: void
): Promise<boolean>{
  console.log('enter handler')
  await getCurrentUser();
  console.log('got current user')
  

  // useEffect(() => {
  //   const listener: HubCallback = ({ payload }) => {
  //     console.log(payload)
  //     if (payload.event === 'signedIn') {
  //       return true
  //     } else if (payload.event === 'signedOut') {
  //       return false
  //     }
  //   };
   
  //   const unsubscribe = Hub.listen('auth', listener);

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  return true
}

export const useIsSignedIn = () => 
  useDataState(_useIsSignedIn, false)


