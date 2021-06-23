import { PROFILE_LOADED, PROFILE_LOADING, USER_NOT_FOUND } from "../types";

const initialState = {
  social: null,
  isLoaded: null,
  error: null,
  hits: [],
};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING: {
      return {
        ...state,
        isLoaded: false,
      };
    }
    case PROFILE_LOADED: {
      return {
        ...state,
        isLoaded: true,
        social: action.payload.social,
        user: action.payload,
      };
    }
    case USER_NOT_FOUND: {
      return {
        ...state,
        error: 404,
      };
    }
    case "HIT_COUNTED": {
      return {
        ...state,
        social: action.payload.updatedUser.social,
      };
    }
    default:
      return state;
  }
}
