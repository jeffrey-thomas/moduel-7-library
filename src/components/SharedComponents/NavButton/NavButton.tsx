import { Box, Button, ButtonProps, Link } from "@mui/material"
import { To, Link as RouterLink } from "react-router-dom"

type NavButtonProps = {to:To} & ButtonProps

export const NavButton = (props:NavButtonProps) =>{
    let {to, ...buttonProps} = props;
    return(
        <Link component={RouterLink} to={to} sx={{textDecoration:'none'}} >
            <Button  color='secondary' {...buttonProps}>{props.children}</Button>
        </Link>      
    )

}