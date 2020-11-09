import axios from 'axios';
import {
    returnErrors
} from './errorActions';
import {
    PROFILE_LOADED,
    PROFILE_LOADING,
    USER_NOT_FOUND
} from '../types';

export const getProfile = (username) => async (dispatch, getState) => {
    dispatch({
        type: PROFILE_LOADING
    });
    console.log("profile.isLoaded from action: ", getState().profile)
    // if(getState().profile.isLoaded) {
    //     console.log("profile.isloaded: ", getState().profile.isLoaded)
    //     return;
    // }

    // const IP = await axios.get('http://ip-api.com/json');
    const IP = {}
    axios
        .post(`/api/v1/user/${username}`, IP)
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
