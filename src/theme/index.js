import { createTheme } from '@mui/material/styles';
import { lime } from '@mui/material/colors';

export default createTheme({
    palette: {
        primary: {
            main: '#333333',
        },
        secondary: {
            main: lime[50],
        },
    },
});