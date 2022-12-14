import { Box } from '@mui/material';
import bookshelfImage from '../../images/undraw_bookshelves_re_lxoy.svg';
import { CheckAuth } from '../Authorization/CheckAuth';
import { GoogleSignInButton } from '../Authorization/GoogleSignInButton';
import { NavButton } from '../SharedComponents';

export const Home= () => {

  const style={
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'space-around',
    height:'95%',
  }

  return (
    <Box sx={style}>
      <h1>Digital Bookshelf</h1>
      <Box sx={{
        content:`url(${bookshelfImage})`,
        width:'50%',
        height:'auto',
        maxHeight:'70%'
      }}></Box>
      <CheckAuth
        onAuthorized={<NavButton to='/dashboard' variant='contained'>Go to My Bookshelf</NavButton>}
        onUnauthorized={<GoogleSignInButton/>}
      />
      
    </Box>
  )
}
