import SpotifyWebApi from 'spotify-web-api-js'

const spotifyApi = new SpotifyWebApi();


function fetchedPLaylist(playlists){
   return { type: "FETCHED_PLAYLISTS", playlists}
}

function selectPlaylist(playlist){
  return {type: 'SELECT_PLAYLIST', playlist}
}

function accessingToken(token){
  return {type: "ACCESSING_TOKEN", token}
}
function fetchedSongs(songs){
  return {type:"FETCHED_SONGS", songs}
}

function getCurrentSong(song) {
  return {type:"CURRENT_SONG", song}
}

function startPlayback(playerStatus) {
  return {type:"START_PLAYBACK", playerStatus}
}

function pausePlayback(playerStatus) {
  return {type:"PAUSE_PLAYBACK", playerStatus}
}

function startPlayerActivity(status){
  return {type:"PLAYER_ACTIVE", status}
}

function fetchingPlaylist(token) {
  spotifyApi.setAccessToken(token)
  return (dispatch) => {
    spotifyApi.getUserPlaylists()
  .then(function(playlists) {
    console.log('User playlists', playlists)
    dispatch(fetchedPLaylist(playlists))
  }, function(err) {
    console.error(err);
    })
  }
}

function fetchingSongs(token, playlistId) {
  spotifyApi.setAccessToken(token)
  return (dispatch) => {
    spotifyApi.getPlaylistTracks(playlistId)
  .then(function(songs) {
    console.log('User songs', songs)
    dispatch(fetchedSongs(songs))
  }, function(err) {
    console.error(err);
    })
  }
}

function fetchingCurrentSong(token, songProp){
  debugger
  spotifyApi.setAccessToken(token)
  return (dispatch) => {
    spotifyApi.getMyCurrentPlayingTrack()
  .then(function(song) {
    console.log('Current song', song)
    dispatch(getCurrentSong(songProp))
}, function(err) {
  console.error(err);
    })
  }
}

function pausingPlaybackFetch(token){
  return (dispacth) => {
    fetch('https://api.spotify.com/v1/me/player/pause?device_id=472d89eb36f8c4c491860cb1473029fcc1838d4d',{
      method: 'PUT',
      headers: {"Accept" : "application/json",
      "Content-Type" : "application/json",
      "Authorization" : `Bearer ${token}`}
    })
  }
}

function playingTrack(token, song){
  debugger
  return (dispatch) => {
    fetch('https://api.spotify.com/v1/me/player/play?device_id=472d89eb36f8c4c491860cb1473029fcc1838d4d',{
      method: 'PUT',
      headers: {"Accept" : "application/json",
      "Content-Type" : "application/json",
      "Authorization" : `Bearer ${token}`},
      body: JSON.stringify({"uris": song.item?[`${song.item.uri}`] : [`${song.track.uri}`]})
    })
    .then(dispatch(getCurrentSong(song)))
  }
}


export {accessingToken,
  fetchingPlaylist,
  selectPlaylist,
  fetchingSongs,
  playingTrack,
  fetchingCurrentSong,
  startPlayback,
  pausingPlaybackFetch,
  pausePlayback,
  startPlayerActivity}
