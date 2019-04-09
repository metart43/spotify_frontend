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
  debugger
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

function fetchingCurrentSong(token){
  fetch('https://api.spotify.com/v1/me/player/currently-playing',{
    method: 'GET',
    headers: {"Accept" : "application/json",
    "Content-Type" : "application/json",
    "Authorization" : `Bearer ${token}`}
  })
  .then(res => res.json())
  .then(song => getCurrentSong(song))
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

function playingPlaylist(token, playlist){
  debugger
  return (dispatch) => {
    fetch('https://api.spotify.com/v1/me/player/play?device_id=472d89eb36f8c4c491860cb1473029fcc1838d4d',{
      method: 'PUT',
      headers: {"Accept" : "application/json",
      "Content-Type" : "application/json",
      "Authorization" : `Bearer ${token}`},
      body: JSON.stringify({"context_uri": `${playlist.uri}`})
    })
    .then(res => console.log(res))
  }
}

function playNext(token){
  return (dispatch) => {
  fetch('https://api.spotify.com/v1/me/player/next?device_id=472d89eb36f8c4c491860cb1473029fcc1838d4d',{
    method: "POST",
    headers: {"Accept" : "application/json",
    "Content-Type" : "application/json",
    "Authorization" : `Bearer ${token}`}
    })
    .then(fetchingCurrentSong(token))
  }
}

function playPrevious(token){
  return (dispatch) => {
  fetch('https://api.spotify.com/v1/me/player/previous?device_id=472d89eb36f8c4c491860cb1473029fcc1838d4d',{
    method: "POST",
    headers: {"Accept" : "application/json",
    "Content-Type" : "application/json",
    "Authorization" : `Bearer ${token}`}
    })
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
  startPlayerActivity,
  playingPlaylist,
  playNext,
  playPrevious}
