import { FETCH_FAILED, FETCH_STARTED, FETCH_SUCCEEDED, UPDATE_SEARCH_KEYWORD } from './types'

export const getFetchStarted = () => ({
    type: FETCH_STARTED
})
export const getFetchSuccess = list => ({
    type: FETCH_SUCCEEDED,
    payload: list
})
export const getFetchFailed = error => ({
    type: FETCH_FAILED,
    error
})

export const getUpdateSearchKeyword = search_phrase => ({
    type: UPDATE_SEARCH_KEYWORD,
    payload: search_phrase
})


export const fetchProducts = (search_phrase) => {
    return async dispatch => {
        dispatch(getFetchStarted())
        dispatch(getUpdateSearchKeyword(search_phrase))
        try {
            const res = await fetch('http://3.141.23.218:5000/interview/keyword_search', {
                method: 'post',
                body: JSON.stringify(
                    {
                        "login_token": "INTERVIEW_SIMPLY2021",
                        "search_phrase": search_phrase,
                    }
                )
            })
            const dataJson = await res.json()
            dispatch(getFetchSuccess(dataJson.data))
        } catch (error) {
            dispatch(getFetchFailed(error))
        }
    }
}