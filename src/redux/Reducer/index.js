import { combineReducers } from 'redux';
import { authReducer } from './AuthReducer'

export const allReducer = combineReducers({
    auth : authReducer
})

