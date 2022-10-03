import { Button, ButtonProps, ListItemButton, ListItemText } from "@mui/material"
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useFirebaseApp } from "reactfire";

type SignOutButtonProps = { isListItem?:boolean} & ButtonProps;

export const SignOutButton = ({isListItem=false,...props}:SignOutButtonProps)=>{

    const auth = getAuth(useFirebaseApp());
    const nav = useNavigate();

    const signout = async()=>{
        auth.signOut();
        nav('/');
    }

    return (
            isListItem 
                ? <ListItemButton sx={{p:0}} onClick={signout}>
                    <ListItemText sx={{pl:'8px'}}>Sign Out</ListItemText>  
                </ListItemButton>
                : <Button {...props} onClick={signout}>Sign Out</Button>
        
    )
}