import { Box } from "@mui/material"
import { ReactNode } from "react"
import { useAuthCheck } from "../../../hooks/useAuthCheck"

interface CheckAuthProps{
    onAuthorized?:ReactNode,
    onUnauthorized?:ReactNode
}

export const CheckAuth = (props:CheckAuthProps)=>{
    const authorized = useAuthCheck();

    return(
        <Box> { authorized ? props.onAuthorized  : props.onUnauthorized  } </Box>
    )
}