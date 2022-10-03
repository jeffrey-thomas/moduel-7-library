import { useState, useEffect } from 'react';
import { useSigninCheck } from 'reactfire';


//Only use in components inside FireAuthProviders
export const useAuthCheck = () => {
	
    const {status, data:signInCheckResult} = useSigninCheck();


    const [authorized, setAuthorized] = useState(false);

    useEffect( () => {
        setAuthorized(status==='success' && signInCheckResult.signedIn)
    }, [status,signInCheckResult])
	
    return authorized
  }