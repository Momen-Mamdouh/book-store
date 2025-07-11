
'use client';
import { createTheme as createMuiTheme } from '@mui/material/styles';
import { extendTheme as extendJoyTheme } from '@mui/joy/styles';


declare module '@mui/material/styles' {
  interface Palette {
    mainHoverColor: Palette['primary'];
    secondaryHoverColor:Palette['primary'];
    customPrimary:Palette['primary'];
  }

  interface PaletteOptions {
    mainHoverColor?: PaletteOptions['primary'];
    secondaryHoverColor?:PaletteOptions['primary'];
    customPrimary?: PaletteOptions['primary'];
  }
}

// MUI (Material UI) Theme
const muiTheme = createMuiTheme({
  typography: {
    fontFamily: 'var(--font-quintessential)',
     fontSize: 16,
  },
  palette: {
    primary:{
      main:'#a35e17',
      dark:'#183B4E',
      light:'#F3F3E0',
    },
    secondary: {
      main: '#FFF8E8',  
    },
    mainHoverColor: {
      main: '#171717',
      light: '#3c3c3c',
      dark: '#000000',
    },
    secondaryHoverColor:{
      main: '#3D0301',
    }
  },

});


export const joyTheme = extendJoyTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: { solidBg: '#594100' },
     
      },
    },
  },
});



export { muiTheme };
