import React, { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';

import { fetchProducts } from '../store/actions';

const parseInput = (search_input) => {
    return search_input && search_input.replace(/\+/g, ' ')
}

function SearchInput() {
    const dispatch = useDispatch()
    const { search_arg } = useParams() || {}
    const searchInput = useSelector((state) => state.app.searchInput)
    const inputRef = useRef(null)
    const navigate = useNavigate()

    const onSearch = () => {
        // jump search page
        const searchKeyword = inputRef.current.value
        if (!searchKeyword || searchKeyword.length === 0) return

        dispatch(fetchProducts(searchKeyword))
        navigate(`/search/${searchKeyword.replace(/\s/g, '+')}`)
    }

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSearch()
        }
    }

    return (
        <Grid container spacing={2} wrap="nowrap" display="flex" alignItems="center">
            <TextField onKeyDown={onKeyDown} defaultValue={searchInput || parseInput(search_arg)} size='small' fullWidth placeholder='Search for new products in 961K stores' inputRef={inputRef} />
            <Button sx={{ ml: 2 }} onClick={onSearch} variant="outlined">
                <SearchIcon />
            </Button>
        </Grid>
    );
}

export default SearchInput;
