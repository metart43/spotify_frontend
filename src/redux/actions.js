function fetchedPLaylist(playlists){
   return { type: "FETCHED_PLAYLISTS", playlists}
}

function accessingToken(token){
  return {type: "ACCESSING_TOKEN", token}
}


export {accessingToken}
