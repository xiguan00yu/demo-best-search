import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Link from '@mui/material/Link';

import { useDispatch } from 'react-redux';
import { useLocation, Outlet, useNavigate } from "react-router-dom";

import SearchInput from './search-input'
import { getUpdateSearchKeyword } from '../store/actions';

function Layout() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation();
    return (
        <main>
            <AppBar color='secondary' position="fixed">
                <Toolbar>
                    <Grid flex={1} spacing={2} container direction="row" wrap='nowrap' display="flex" alignItems="center" >
                        <Link href="" onClick={() => {
                            dispatch(getUpdateSearchKeyword(''))
                            navigate('/')
                        }} underline="none">
                            <Grid item direction="row" wrap='nowrap' display="flex">
                                <Typography variant="h6" component="div">
                                    <strong>Best</strong>
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Search
                                </Typography>
                            </Grid>
                        </Link>
                        <Grid item xs={10}>
                            {location.pathname.includes('search') && <SearchInput />}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Grid flex={1} sx={{ backgroundColor: 'secondary.main', mt: 4 }} container direction="column" display="flex" alignItems="center">
                <Grid item xs={12} sm={11} md={10} lg={9.5} xl={7.5} sx={{ p: 2 }}>
                    <Outlet />
                </Grid>
            </Grid>
        </main>

    );
}

export default Layout;
