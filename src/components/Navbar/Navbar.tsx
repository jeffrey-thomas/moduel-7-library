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
import { useTheme } from '@mui/material';
import { NavButton } from '../SharedComponents';
import { Logo } from '../Logo';
import { GoogleSignInButton } from '../Authorization/GoogleSignInButton';
import { CheckAuth } from '../Authorization/CheckAuth';
import { SignOutButton } from '../Authorization/SignOutButton';

interface NavbarProps{
    height:string;
}

export const Navbar = (props:NavbarProps)=>{

    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();

    const styles={
        navLogo:{            
            display:'flex',
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',

        },

        navButton:{
            color:theme.palette.primary.contrastText
        }
    }

    const handleDrawerToggle=()=>{ setDrawerOpen(!drawerOpen); }

    const drawer = (
        <Box onClick={handleDrawerToggle}>
            <List>
                <ListItem key='about' sx={{p:0}}>
                    <ListItemButton href='/about' sx={{p:0}}>
                        <ListItemText primary='About' sx={{pl:'8px'}}/>
                    </ListItemButton>
                </ListItem>
                <ListItem key='contact' sx={{p:0}}>
                    <ListItemButton href='/contact' sx={{p:0}}>
                        <ListItemText primary='Contact' sx={{pl:'8px'}}/>
                    </ListItemButton>
                </ListItem>
                <CheckAuth
                    onAuthorized={
                        <Box>
                        <ListItem key='dashboard' sx={{p:0}}>
                            <ListItemButton href='/dashboard' sx={{p:0}}>
                                <ListItemText primary='My Bookshelf' sx={{pl:'8px'}}/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem key='signout' sx={{p:0}}>
                            <SignOutButton isListItem={true}/>
                        </ListItem>
                        </Box>
                    }
                    onUnauthorized={
                        <ListItem key='signin' sx={{p:0, pl:'8px'}}>
                            <GoogleSignInButton/>
                        </ListItem>
                    }
                />
                
                
            </List>    
        </Box> 
    );

    return (
        <Box >
            <AppBar component="nav" sx={{height:props.height, zIndex:(theme)=>theme.zIndex.drawer+1}}>
                <Toolbar sx={{justifyContent:'space-between'}} variant='dense'>

                    

                    {/* Logo that links back to Home */}
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
                    <Box sx={{display:{xs:'none',sm:'flex'}, flexDirection:'row', alignItems:'center'}}>

                        <NavButton to='/about' sx={styles.navButton}>About</NavButton>
                        <NavButton to='/contact' sx={styles.navButton}>Contact</NavButton>
                        
                        <CheckAuth
                            onAuthorized={
                                <Box>
                                    <NavButton to='/dashboard' sx={styles.navButton}>My Bookshelf</NavButton>
                                    <SignOutButton sx={styles.navButton}/>
                                </Box>
                            }
                            onUnauthorized={<GoogleSignInButton/>}
                        />
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