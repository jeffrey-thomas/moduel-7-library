import { Box } from "@mui/system"
import { NavButton } from "../SharedComponents"

export const About=()=>{
  const styles={
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'space-around',
    height:'100%'
}
  return (
    <Box sx={styles}>
      <h1>About</h1>
      <p>This is a project for a class that displays a react front-end for a Flask SQL backend.</p>
      <NavButton to='/' variant='contained'>Go Back Home</NavButton>
    </Box>
  )
}
