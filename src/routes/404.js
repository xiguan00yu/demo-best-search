import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <Grid container spacing={2} direction="column" display="flex" justifyContent="center" alignItems="center">
            <Grid item xs={12} sx={{ mt: 16 }}>
                <Typography align='center' variant="h1">
                    404
                </Typography>

                <Typography align='center' variant="body1" sx={{ color: 'grey' }}>
                    goback <Link to="/">Home</Link> page
                </Typography>
            </Grid>
        </Grid>
    );
}

export default Home;
