import { combineReducers } from "redux";

const playlistsReducer = (state = [], action) => {
  switch(action.type) {
    case "FETCHED_PLAYLISTS":
    return action.playlists.items
    default:
    return state
  }
}

const selectPlaylistReducer = (state = null, action) => {
  switch (action.type) {
    case "SELECT_PLAYLIST":
    return action.playlist
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

const songReducer = (state = null, action) => {
  switch (action.type) {
    case "FETCHED_SONGS":
    return action.songs
    case "CURRENT_SONG":
    return action.song
    default:
    return state
  }
}

const rootReducer = combineReducers({
  playlists: playlistsReducer,
  token: authReducer,
  playlist: selectPlaylistReducer,
  songs: songReducer,
  currentSong: songReducer
});

export default rootReducer;
