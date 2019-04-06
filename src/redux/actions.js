import SpotifyWebApi from 'spotify-web-api-js'

const spotifyApi = new SpotifyWebApi();


function fetchedPLaylist(playlists){
   return { type: "FETCHED_PLAYLISTS", playlists}
}

function selectPlaylist(playlist){
  debugger
  return {type: 'SELECT_PLAYLIST', playlist}
}

function accessingToken(token){
  return {type: "ACCESSING_TOKEN", token}
}
function fetchedSongs(songs){
  return {type:"FETCHED_SONGS", songs}
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
  spotifyApi.setAccessToken(token, playlistId)
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


export {accessingToken, fetchingPlaylist, selectPlaylist, fetchingSongs}
