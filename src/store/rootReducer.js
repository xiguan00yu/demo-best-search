import { combineReducers } from 'redux'
import AppReducer from './appReducer'
import ResourceReducer from './resourceReducer'


export default combineReducers({
    app: AppReducer,
    resource: ResourceReducer
})