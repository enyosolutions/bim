"use strict";

import { handleActions } from 'redux-actions';
import { BASE_REQUEST, BASE_SUCCESS, BASE_FAILURE } from './BaseAction';
import { Actions } from 'react-native-router-flux';

const initialState = {
};


const ParametersReducer = handleActions({

    [BASE_REQUEST]: (state, action) => {
        return Object.assign({}, state, {loading: true});
    },

    [BASE_SUCCESS]: (state, action) => {
        return { ...state, loading: false, start: action.result};
    },

    [BASE_FAILURE]: (state, action) => {
    	console.error(action.error.stack);
        return { ...state, loading: false, start: false, loginError: action.error };
    }

}, initialState);

export default ParametersReducer;
