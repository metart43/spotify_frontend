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
function fetchedArtist(artist){
  return {type:"FETCHED_ARTIST", artist}
}
function setUser(user){
  return {type:"USER_PROFILE", user}
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

function searchAction(text){
  return {type:"CHANGE_SEARCH_TEXT", text}
}

function startPlayerActivity(status){
  return {type:"PLAYER_ACTIVE", status}
}
function setHiddenGem(hiddenGem){
  return {type:'FETCHED_HIDDEN_GEM', hiddenGem}
}

function setGemSongs(songs){
  return {type:'FETCHED_GEM_SONG', songs}
}

function top5Songs(songs){
  return {type: 'FETCHED_TOP_5_SONGS', songs}
}

function setSimiliarArtist(artists){
  return {type: 'SIMILIAR_ARTIST', artists}
}

function setAvaliableDevices(devices){
  return {type: 'USER_DEVICES', devices}
}

function setCurrentDevice(deviceId){
  return {type: 'CURRENT_DEVICE', device : deviceId}
}

function changeCurrentDevice(device){
  return {type: 'CHANGE_CURRENT_DEVICE', device}
}

function logoutUser(){
  return {type: 'LOG_OUT_USER'}
}

function setArtistsAlbums(albums){
  return {type: "ARTIST_ALBUMS", albums}
}

function fetchingUserInfo(user) {
  return (dispatch) => {
    fetch(`http://localhost:3000/api/v1/users/${user.id}`)
    .then(res => res.json())
    .then(user => {dispatch(setHiddenGem(user.hidden_gem))
    dispatch(setGemSongs(user.songs))})
  }
}

function settingUser(token){
  return (dispatch) => {
    fetch('https://api.spotify.com/v1/me',{
    method: 'GET',
    headers: {"Accept" : "application/json",
    "Content-Type" : "application/json",
    "Authorization" : `Bearer ${token}`}
  })
  .then(res => res.json())
  .then(user => {
    dispatch(fetchingUserInfo(user))
    dispatch(setUser(user))})
  }
}

function fetchingPlaylist(token) {
  spotifyApi.setAccessToken(token)
  return (dispatch) => {
    spotifyApi.getUserPlaylists('1199230738')
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
   console.log('step2');
  return (dispatch) => {
    fetch('https://api.spotify.com/v1/me/player', {
    method: 'GET',
    headers: {"Accept" : "application/json",
    "Content-Type" : "application/json",
    "Authorization" : `Bearer ${token}`}
  })
    .then(res => res.json())
    .then(data => {data.is_playing ? dispatch(startPlayback()) : dispatch(pausePlayback()) ; dispatch(getCurrentSong(data))})
  }
}

function pausingPlaybackFetch(token, device){
  return (dispacth) => {
    fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${device}`,{
      method: 'PUT',
      headers: {"Accept" : "application/json",
      "Content-Type" : "application/json",
      "Authorization" : `Bearer ${token}`}
    })
  }
}

function playingTrack(token, song, device){
  return (dispatch) => {
    console.log("step 1")
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device}`,{
      method: 'PUT',
      headers: {Accept : "application/json",
      "Content-Type" : "application/json",
      "Authorization" : `Bearer ${token}`},
      body: JSON.stringify({"uris": song.item?[`${song.item.uri}`] : [`${song.track.uri}`]})
    })
  }
}

function playingTrackFromGemItem(token, song, device){
  return (dispatch) => {
    console.log("step 1")
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device}`,{
      method: 'PUT',
      headers: {Accept : "application/json",
      "Content-Type" : "application/json",
      "Authorization" : `Bearer ${token}`},
      body: JSON.stringify({"uris": song.uri ? [`${song.uri}`] : [`${song.song_uri}`]})
    })
  }
}

function playResume(token, device){
  return (dispatch) => {
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device}`,{
      method: 'PUT',
      headers: {Accept : "application/json",
      "Content-Type" : "application/json",
      "Authorization" : `Bearer ${token}`}
    })
  }
}

function playingPlaylist(token, playlist, device){
  return (dispatch) => {
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device}`,{
      method: 'PUT',
      headers: {"Accept" : "application/json",
      "Content-Type" : "application/json",
      "Authorization" : `Bearer ${token}`},
      body: JSON.stringify({"context_uri": `${playlist.uri}`})
    })
    .then(res => console.log(res))
  }
}


function playNext(token, device){
  return (dispatch) => {
  fetch(`https://api.spotify.com/v1/me/player/next?device_id=${device}`,{
    method: "POST",
    headers: {"Accept" : "application/json",
    "Content-Type" : "application/json",
    "Authorization" : `Bearer ${token}`}
    })
    .then((dispatch(fetchingCurrentSong(token))))
  }
}

function playPrevious(token, device){
  return (dispatch) => {
  fetch(`https://api.spotify.com/v1/me/player/previous?device_id=${device}`,{
    method: "POST",
    headers: {"Accept" : "application/json",
    "Content-Type" : "application/json",
    "Authorization" : `Bearer ${token}`}
    })
  }
}

function fetchArtistAlbums(token, artistId){
  return (dispatch) => {
    fetch(`	https://api.spotify.com/v1/artists/${artistId}/albums`, {
      headers: {"Accept" : "application/json",
      "Content-Type" : "application/json",
      "Authorization" : `Bearer ${token}`}
    })
    .then(res => res.json())
    .then(data => dispatch(setArtistsAlbums(data.items.filter(item => item.album_group === "album").slice(0,5))))
  }
}

function fetchArtist(token, artistId){
  return (dispatch) => {
    fetch(`https://api.spotify.com/v1/artists/${artistId}`,{
      headers: {"Accept" : "application/json",
      "Content-Type" : "application/json",
      "Authorization" : `Bearer ${token}`}
      })
    .then(res => res.json())
    .then(artist => dispatch(fetchedArtist(artist)),
                    dispatch(fetchArtistAlbums(token, artistId)))
  }
}

function getTopSongs(token, artistId){
  return (dispatch) => {
  fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US`,{
    headers: {"Accept" : "application/json",
    "Content-Type" : "application/json",
    "Authorization" : `Bearer ${token}`}
    })
  .then(res => res.json())
  .then(array => dispatch(top5Songs(array.tracks.slice(0,5))))
  }
}

function getSimiliarArtist(token, artistId){
  return (dispatch) => {
  fetch(`	https://api.spotify.com/v1/artists/${artistId}/related-artists`,{
    headers: {"Accept" : "application/json",
    "Content-Type" : "application/json",
    "Authorization" : `Bearer ${token}`}
    })
  .then(res => res.json())
  .then(array => dispatch(setSimiliarArtist(array.artists.slice(0,5))))
  }
}

function getAvaliableDevicesRedux(token, user){
   return (dispatch) => {
   fetch(`https://api.spotify.com/v1/me/player/devices`, {
     headers: {"Accept" : "application/json",
     "Content-Type" : "application/json",
     "Authorization" : `Bearer ${token}`}
   })
   .then(res => res.json())
   .then(data => {
     if (data.devices.length === 0) {
       console.log('error')
     } else {
       dispatch(setAvaliableDevices(data.devices))
       dispatch(setCurrentDevice(data.devices[0].id))
     }
   })
 }
}

function transferPlayback(token, deviceId){
  return (dispatch) => {
    fetch('https://api.spotify.com/v1/me/player',{
    method: 'PUT',
    headers: {"Accept" : "application/json",
    "Content-Type" : "application/json",
    "Authorization" : `Bearer ${token}`},
    body: JSON.stringify({"device_ids": [`${deviceId}`]})
  })
  .then(dispatch(changeCurrentDevice(deviceId)))
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
  playPrevious,
  settingUser,
  playResume,
  playingTrackFromGemItem,
  fetchArtist,
  getTopSongs,
  getSimiliarArtist,
  getAvaliableDevicesRedux,
  logoutUser,
  setCurrentDevice,
  transferPlayback,
  searchAction}
