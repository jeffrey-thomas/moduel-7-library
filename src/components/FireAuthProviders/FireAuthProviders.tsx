import { getAuth } from "firebase/auth";
import { PropsWithChildren, ReactNode } from "react";
import { AuthProvider, FirebaseAppProvider, useFirebaseApp } from "reactfire"
import { firebaseConfig } from "../../firebaseConfig"

const AuthWrapper = (props:PropsWithChildren)=>{
    const app = useFirebaseApp();
    const auth = getAuth(app);

    return(
        <AuthProvider sdk={auth}>
            {props.children}
        </AuthProvider>
    )
}

export const FireAuthProviders = (props:{children:ReactNode})=>{

    return(
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
            <AuthWrapper>
                {props.children}
            </AuthWrapper>
        </FirebaseAppProvider>
    )

}