import { Button } from '@mui/material';
import { Box } from '@mui/material';
import { useNavigate, useRouteError } from 'react-router-dom'


interface RouterError{
    statusText?:string;
    message?:string;
}

export const ErrorPage = () => {

    const error = useRouteError() as RouterError;
    const navigate = useNavigate();

    const styles={
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        height:'100%',
        justifyItems:'center'
    }

    return (
        <Box sx={styles}>
            <h1>Whoops...</h1>
            <p>Something unexpected happened.</p>
            <p><i>{error.statusText || error.message}</i></p>
            <Button onClick={()=>{navigate(-1)}} variant='contained'>Go Back</Button>
        </Box>
    )
}
