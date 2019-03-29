import { combineReducers } from 'redux';

import data from './dataReducer';
import auth from './authReducer';
var {reducer: formReducer} = require('redux-form')
// import {reducer as formReducer} from 'redux-form';
export default combineReducers({
    data,
    auth,
    form: formReducer
});
