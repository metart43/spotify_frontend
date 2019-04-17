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

const top5Songsreducer = (state = null, action) => {
    switch (action.type) {
    case "FETCHED_TOP_5_SONGS":
    return action.songs
    default:
    return state
  }
}

const gemSongsReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCHED_GEM_SONG":
    return action.songs ? action.songs : []
    case "REMOVE_SONGS":
    return []
    case "ADD_GEM_SONGS":
    return state.concat([action.song])
    case 'REMOVE_SONGS_FROM_GEM':
    debugger
    return state.filter(song => song.id != action.song.id)
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
    case "HIDDEN_GEM":
    return action.hiddenGem
    case 'FETCHED_HIDDEN_GEM':
    return action.hiddenGem ? action.hiddenGem : null
    case 'REMOVE_HIDDEN_GEM':
    return null
    default:
    return state
  }
}

const toggleReducer = (state = false, action) => {
  switch (action.type) {
    case 'PILE_ACTIVATE':
      return !action.status
      case 'DEACTIVATE_PILE_TOGGLE':
      return false
    default:
      return state
  }
}

const modalReducer = (state = false, action) => {
  switch (action.type) {
    case "ACTIVATE_PLAYLIST_MODAL":
    return true
    case "DEACTIVATE_PLAYLIST_MODAL":
    return false
    default:
    return state
  }
}

const artistReducer = (state = null, action) => {
  switch (action.type) {
    case "FETCHED_ARTIST":
      return action.artist
    default:
      return state
  }
}

const similiarArtistReducer = (state = null, action) => {
  switch (action.type) {
    case "SIMILIAR_ARTIST":
    return action.artists
    default:
    return state
  }
}

const userDevicesReducer = (state = [], action) => {
  switch (action.type) {
    case "USER_DEVICES":
    return action.devices
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
  user: userReducer,
  hiddenGem: hiddenGemReducer,
  gemSongs: gemSongsReducer,
  pileToggleStatus: toggleReducer,
  playlistModalStatus: modalReducer,
  artist: artistReducer,
  top5Songs: top5Songsreducer,
  similiarArtists: similiarArtistReducer,
  devices: userDevicesReducer
});

export default rootReducer;
