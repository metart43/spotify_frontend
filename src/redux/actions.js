function fetchedPLaylist(playlists){
   return { type: "FETCHED_PLAYLISTS", playlists}
}

function accessingToken(token){
  return {type: "ACCESSING_TOKEN", token}
}


getHashParams() {
 let hashParams = {}
 let e, r = /([^&;=]+)=?([^&;]*)/g,
     q = window.location.hash.substring(1)
 while ( e = r.exec(q)) {
    hashParams[e[1]] = decodeURIComponent(e[2])
 }
 console.log(hashParams);
 return hashParams
}
