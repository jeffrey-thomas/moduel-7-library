import { createTheme } from "@mui/material/styles";


export const theme = createTheme({
    breakpoints:{
        values:{
            xs: 0,
            sm: 500,
            md: 900,
            lg: 1200,
            xl: 1536
        }
    },
    palette: {
        primary: {
            main: '#882222',
            contrastText: '#f2f2f2',
          },
          secondary: {
            main: '#cc4444',
          },
          text: {
            primary: 'rgba(41,10,10,0.8)',
            secondary: 'rgba(0,0,0,0.6)',
            disabled: 'rgba(0,0,0,0.3)',
          },
          background: {
            paper: '#e7d9d9',
            default: '#fff2f2',
          },
        },
        typography: {
          fontFamily: "'Raleway',sans-serif"
        },
});