import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import { useTheme } from '@mui/system';
import { NavButton } from '../SharedComponents';
import { Logo } from '../Logo';

interface NavItem{
    label:string;
    path:string;
}

interface NavbarProps{
    height:string;
}

export const Navbar = (props:NavbarProps)=>{



    const navItems:NavItem[]=[
        {label:'About', path:'/about'},
        {label:'Contact', path:'/contact'},
        {label:'My Dashboard', path:'/dashboard'}
    ]

    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();

    const styles={
        navLogo:{            
            display:'flex',
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',

        },
        // logo:{
        //     content:`url(${logo})`,
        //     color:theme.palette.primary.contrastText,
        //     '&:hover':{backgroundColor:theme.palette.secondary}            
        // },
        navButton:{
            color:theme.palette.primary.contrastText
        }
    }

    const handleDrawerToggle=()=>{ setDrawerOpen(!drawerOpen); }

    const drawer = (
        <Box onClick={handleDrawerToggle}>
            <List>
                {navItems.map((item)=>(
                    <ListItem key={item.label} sx={{p:0}}>
                        <ListItemButton href={item.path} sx={{p:0}}>
                            <ListItemText primary={item.label}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>    
        </Box> 
    );

    return (
        <Box >
            <AppBar component="nav" sx={{height:props.height, zIndex:(theme)=>theme.zIndex.drawer+1}}>
                <Toolbar sx={{justifyContent:'space-between'}} variant='dense'>

                    

                    {/* Logo that links back to Home */}
                    
                    {/* <Box sx={styles.navLogo}> */}
                         {/* mix react-router-dom and @mui/material links to navigate without refresh and still have 'sx' prop  */}
                        <Link component={RouterLink} to="/" sx={{alignSelf:'stretch'}}><Logo/></Link>
                    {/* </Box> */}

                    {/*/ Button to open menu, only appears on smallest screens */}
                    <IconButton 
                        sx={{display:{sm:'none'}}}
                        aria-label="open menu" 
                        edge="end" 
                        onClick={handleDrawerToggle}
                    >
                        <MenuIcon sx={{color:theme.palette.primary.contrastText}}/>
                    </IconButton>

                    {/* Horizontal NavList, all but the smallest screens */}
                    <Box sx={{ display: { xs: 'none', sm: 'block' }}}>
                        {navItems.map((item) => (
                            <NavButton key={item.label} to={item.path} sx={styles.navButton}> {item.label} </NavButton>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Menu Drawer used on narrow screens */}
            <Box component="nav">
                <Drawer
                    anchor='top'
                    variant="temporary"
                    open={drawerOpen}
                    onClose={handleDrawerToggle}
                >
                    <Box sx={{height:props.height}}></Box>
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}