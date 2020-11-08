import {
    PROFILE_LOADED,
    PROFILE_LOADING,
    USER_NOT_FOUND
} from '../types';

const initialState = {
    social: null,
    isLoaded: null,
    error: null
};

export default function profileReducer(state = initialState, action) {
    if(action.type===PROFILE_LOADED) {
        console.log('action.payload: ', action.payload)
    }
    switch (action.type) {
        case PROFILE_LOADED: {
            return {
                ...state,
                social: action.payload,
                isLoaded: true
            };
        }
        case PROFILE_LOADING: {
            return {
                ...state,
                isLoaded: false
            };
        }
        case USER_NOT_FOUND: {
            return {
                ...state,
                error: 404
            }
        }
        default:
            return state;
    }
}
