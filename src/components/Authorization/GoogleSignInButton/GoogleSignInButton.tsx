import { Box, Button } from "@mui/material"
import { ReactComponent as Gnormal } from '../../../images/btn_google_dark_normal_ios.svg'
import { useFirebaseApp } from "reactfire"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"

export const GoogleSignInButton = ()=>{
    const auth = getAuth(useFirebaseApp());

    const signin = async()=>{
        const provider = new GoogleAuthProvider();
        const response = await signInWithPopup(auth,provider)
    }

    return (
        <Button 
            variant='contained' 
            sx={{
                backgroundColor:'#4285F4', 
                p:0,
                pr:'6px', 
                display:'flex', 
                flexDirection:'row', 
                alignItems:'center',
                color:'primary.contrastText',
                fontFamily:'Roboto',
                '&:hover':{
                    backgroundColor:'#4285F4'
                }
            }}
            onClick={signin}
        >
            <Box sx={{width:'36px', height:'35px'}}><Gnormal className="gLogo"/></Box>
            Sign in with Google
        </Button>
    )
}