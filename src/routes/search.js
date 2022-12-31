import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';

import {
    ResponsiveContainer,
    ComposedChart,
    // Line,
    Area,
} from 'recharts';

import { fetchProducts } from '../store/actions';

const loadings = [0, 1, 2, 3]

const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
]

const parseDate = (date /** 2020-01 */) => {
    const [year, m] = date.split('-')
    return `${months[parseInt(m) - 1]} ${year}`
}

const colors = [
    '#82ca9d',
    '#82ca9d',
    '#8884d8',
    '#8884d8',
    '#8884d8',
    '#8884d8',
    '#82ca9d',
    '#82ca9d',
]

function Search() {
    const dispatch = useDispatch()
    const { search_arg } = useParams()
    const searchInput = useSelector(state => state.app.searchInput)
    const searchLoading = useSelector(state => state.app.searchLoading)
    const searchData = useSelector(state => state.app.searchList)
    const searchError = useSelector(state => state.app.searchError)

    useEffect(() => {
        if (
            search_arg?.length > 0 &&
            (!searchInput || searchInput.replace(/\s/g, '+') !== search_arg)
        ) {
            dispatch(fetchProducts(search_arg))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    if (!searchLoading && searchError) {
        console.warn(searchError)
        return <Grid container direction="column" justifyContent="center" alignItems="center" sx={{ mt: '30%' }}>
            <Typography align='left' variant="h5" sx={{ color: 'red' }}>
                sorry ... we get some error ...
            </Typography>
        </Grid>
    }


    const productTrends = searchData?.['product_trends'] || []
    return (
        <Grid container direction="column" columnSpacing={0} rowSpacing={4} sx={{ mt: 4 }}>
            <Grid xs={12}>
                <Typography align='left' variant="h5" sx={{ fontWeight: '100' }}>
                    Related product trends
                </Typography>
            </Grid>
            <Grid xs={12} container columnSpacing={2} direction="row" display="flex">
                {searchLoading && (
                    loadings.map(_ => (
                        <Grid key={_} xs={12} sm={6} md={4} lg={3}>
                            <Skeleton variant="text" width="80%" />
                            <Skeleton sx={{ mt: 1 }} variant="text" width="60%" />
                            <Skeleton sx={{ mt: 1 }} variant="rounded" height={200} />
                        </Grid>
                    ))
                )}
                {
                    !searchLoading &&
                    productTrends?.length > 0 &&
                    productTrends.map((item, index) => {
                        const msv = item.search_msv || []
                        const color = colors[index % colors.length]
                        return (
                            <Grid key={item.name} xs={12} sm={6} md={4} lg={3}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h5" component="div" sx={{ fontWeight: '100' }}>
                                            {item.name.split(' ').map((shortName, index) => {
                                                const display_text = `${shortName} `
                                                return (
                                                    shortName.toLowerCase() === search_arg.toLowerCase() ? (<b key={index}>{display_text}</b>) : display_text
                                                )
                                            })}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: 'gray' }}>
                                            Growth {item.growth}%
                                        </Typography>
                                        <ResponsiveContainer width="100%" height={180}>
                                            <ComposedChart
                                                data={msv}
                                            >
                                                <Area type="monotone" dataKey="sv" fill={color} stroke={color} />
                                                {/** <Line type="basisOpen" dot={false} dataKey="sv" stroke={color} /> */}
                                            </ComposedChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                    <CardActions>
                                        <Typography width="100%" component="div" variant="body2" sx={{ color: 'gray' }} align="center">
                                            {parseDate(msv[0].date)} - {parseDate(msv[msv.length - 1].date)}
                                        </Typography>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Grid>
    );
}

export default Search;
