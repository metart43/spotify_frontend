import { combineReducers } from "redux";

const userReducer = (state = null, action) => {
  switch(action.type) {
    case "USER_PROFILE":
    return action.user
    default:
    return state
  }
}

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

const authReducer = (state = null, action) => {
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
    default:
    return state
  }
}

const playerReducer = (state = null, action) => {
  switch (action.type) {
  case "CURRENT_SONG":
  return action.song
  default:
  return state
  }
}

const playerActivityReducer = (state = false, action) => {
switch (action.type) {
  case "PLAYER_ACTIVE":
  return true
  default:
  return state
  }
}

const startPlaybackReducer = (state = false, action) => {
  switch (action.type) {
    case "START_PLAYBACK":
    return true
    case "PAUSE_PLAYBACK":
    return false
    default:
    return state
  }
}

const hiddenGemReducer = (state = null, action) => {
  switch (action.type) {
    case 'FETCHED_GEMS':
    return state
      break;
    default:
    return state
  }
}

const rootReducer = combineReducers({
  playlists: playlistsReducer,
  token: authReducer,
  playlist: selectPlaylistReducer,
  songs: songReducer,
  currentSong: playerReducer,
  playbackStatus: startPlaybackReducer,
  playerStatus: playerActivityReducer,
  user: userReducer
});

export default rootReducer;
