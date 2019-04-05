import SpotifyWebApi from 'spotify-web-api-js'

const spotifyApi = new SpotifyWebApi();


function fetchedPLaylist(playlists){
   return { type: "FETCHED_PLAYLISTS", playlists}
}

function accessingToken(token){
  return {type: "ACCESSING_TOKEN", token}
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

// function fetchingPaintings(){
//   return (dispatch) => {
//     dispatch(loadingPainting())
//     fetch(URL)
//     .then(res => res.json())
//     .then(paintings => {
//       // debugger
//       console.log(paintings)
//       dispatch(fetchedPaintings(paintings))
//       //{type: "FETCHED_PAINTINGS", paintings}
//     })
//   }
// }
export {accessingToken, fetchingPlaylist}
