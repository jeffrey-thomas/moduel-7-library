import { Box } from '@mui/material';
import { NavButton } from '../SharedComponents';

export const Contact = () => {

    const styles={
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'space-around',
        height:'100%'
    }

    return (
        <Box sx={styles}>
            <h1>Contact</h1>
            This is a project for a class, so I don't really want to be contacted about it.
            <NavButton to='/' variant='contained'>Go Back Home</NavButton>
        </Box>
    )
}
