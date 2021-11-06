import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#D97904',
    },
    secondary: {
        main: '#203644',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

export default theme;