import axios from 'axios';
import {
    returnErrors
} from './errorActions';
import {
    PROFILE_LOADED,
    PROFILE_LOADING,
    USER_NOT_FOUND
} from '../types';

export const getProfile = (username) => (dispatch) => {
    dispatch({
        type: PROFILE_LOADING
    });

    axios
        .get(`/api/v1/user/${username}`)
        .then(res =>
            dispatch({
                type: PROFILE_LOADED,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            if(err.response.status === 404) {
                dispatch({type: USER_NOT_FOUND})
            }
        });
};
