import { Box } from "@mui/material"
import { GoogleSignInButton } from "../GoogleSignInButton"

export const Unauthorized=()=>{
  const styles={
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'space-around',
    height:'100%'
}
  return (
    <Box sx={styles}>
      <h1>Unauthorized</h1>
      <p>You must sign in to continue.</p>
      <GoogleSignInButton/>
    </Box>
  )
}
