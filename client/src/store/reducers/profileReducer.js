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
    console.log('state before performing', state)
    switch (action.type) {
        case PROFILE_LOADING: {
            return {
                ...state,
                isLoaded: false
            };
        }
        case PROFILE_LOADED: {
            return {
                ...state,
                isLoaded: true,
                social: action.payload
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
