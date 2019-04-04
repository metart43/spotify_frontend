import { combineReducers } from "redux";

const playlistsReducer = (state = [], action) => {
  switch(action.type) {
    case "FETCHED_PLAYLISTS":
    return action.playlists
    default:
    return state
  }
}

const authReducer = (state = {}, action) => {
  switch(action.type) {
    case "ACCESSING_TOKEN":
    return action.token
    default:
    return state
  }
}

const rootReducer = combineReducers({
  playlists: playlistsReducer,
  token: authReducer
});

export default rootReducer;
