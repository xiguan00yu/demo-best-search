import { FETCH_FAILED, FETCH_STARTED, FETCH_SUCCEEDED, UPDATE_SEARCH_KEYWORD } from './types'

const InitState = {
    searchInput: '',
    searchLoading: null,
    searchList: null,
    searchError: null,
}

function AppReducer(state = InitState, action) {
    const { type, payload, error } = action || {}

    if (type === FETCH_STARTED) {
        return { ...state, searchLoading: true }
    }

    if (type === FETCH_SUCCEEDED) {
        return { ...state, searchLoading: false, searchList: payload, searchError: null }
    }

    if (type === FETCH_FAILED) {
        return { ...state, searchLoading: false, searchError: error, searchList: null }
    }

    if (type === UPDATE_SEARCH_KEYWORD) {
        return { ...state, searchInput: payload }
    }

    return state;
}


export default AppReducer