import { createTheme } from "@mui/material/styles";


export const theme = createTheme({
    breakpoints:{
        values:{
            xs: 0,
            sm: 400,
            md: 900,
            lg: 1200,
            xl: 1536
        }
    },
    palette: {
        primary: {
            main: '#222288',
            contrastText: '#f2f2f2',
          },
          secondary: {
            main: '#3366cc',
          },
          text: {
            primary: 'rgba(10,10,41,0.8)',
            secondary: 'rgba(0,0,0,0.6)',
            disabled: 'rgba(0,0,0,0.3)',
          },
          background: {
            paper: '#d9d9d9',
            default: '#f2f2f2',
          },
        },
        typography: {
          fontFamily: "'Raleway',sans-serif"
        },
});