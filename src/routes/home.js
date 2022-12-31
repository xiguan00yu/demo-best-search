import SearchInput from '../components/search-input'
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

function Home() {
    return (
        <Grid container spacing={2} direction="column" display="flex" justifyContent="center" alignItems="center">
            <Grid item xs={12} sx={{ mt: 16 }}>
                <Typography align='center' variant="h4" component="div">
                    Search Trends
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{ mt: 8 }}>
                <SearchInput />
            </Grid>
        </Grid>
    );
}

export default Home;
