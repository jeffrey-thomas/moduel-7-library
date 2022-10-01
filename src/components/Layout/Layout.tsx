import { Box } from '@mui/system'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../Navbar'

export const Layout = () => {

    const navbarHeight = '48px';
    
    const styles = {
        height:`calc(100% - ${navbarHeight})`,
    }    

    return (
        <Box sx={styles}>
            <Navbar height={navbarHeight}/>
            <Box sx={{ height:`calc(100% - ${navbarHeight})`, mt:`${navbarHeight}` }}>
                <Outlet/>
            </Box>
        </Box>
    )
}
