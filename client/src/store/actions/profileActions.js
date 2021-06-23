import axios from "axios";
import { returnErrors } from "./errorActions";
import { PROFILE_LOADED, PROFILE_LOADING, USER_NOT_FOUND } from "../types";

export const getProfile = (username) => async (dispatch, getState) => {
  dispatch({
    type: PROFILE_LOADING,
  });
  axios
    .get(`/api/v1/user/${username}`)
    .then((res) =>
      dispatch({
        type: PROFILE_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      if (err.response.status === 404) {
        dispatch({ type: USER_NOT_FOUND });
      }
    });
};

export const pushHits =
  (username, name, href) => async (dispatch, getState) => {
    const IP = await axios.get(`http://ip-api.com/json`);

    if (IP.status === 200) {
      const body = {
        IP: IP.data,
        username,
        name,
        href,
      };
      axios
        .post(`/api/v1/user/pushHits`, body)
        .then((res) => {
          dispatch({
            type: "HIT_COUNTED",
            payload: res.data,
          });
        })
        .catch((err) => {
          dispatch(returnErrors("Bad Request", 400));
          console.log(err);
        });
    }
  };

// export const getStatsData = () => async (dispatch, getState) => {
//   setLoading(true);
//   const data = await axios.get("http://localhost:3000/api/v1/user/stats");
//   setLoading(false);
//   console.log("data: ", data);
//   setData(data);
// };
