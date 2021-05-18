import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#424242',
      light: '#6e6e6e',
      dark: '#1c1c1c',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#68bb6c',
      light: '#96ee97',
      dark: '#338a3f',
      contrastText: '#000000'
    },
    error: {
      main: red.A400,
    },
    font: {
      primary: '#ffffff',
      secondary: '#000000'
    },
    background: {
      default: '#424242',
      dark: '#1c1c1c',
      light: '#6e6e6e'
    },
  },
});

export default theme;
