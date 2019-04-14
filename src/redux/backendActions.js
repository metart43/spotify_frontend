
function getHiddenGem(hiddenGem){
  return {type: 'HIDDEN_GEM', hiddenGem}
}

function removeGem(){
  return {type: 'REMOVE_HIDDEN_GEM'}
}

function removeGemSongs(){
  return {type: 'REMOVE_SONGS'}
}

function addGemSongs(song){
  return {type: 'ADD_GEM_SONGS', song}
}

function createHiddenGem (props) {
return (dispatch) => {
  fetch('http://localhost:3000/hidden_gems',{
    method: 'POST',
    headers: {"Content-type" : 'application/json'},
    body: JSON.stringify({user: {user_id : props.id}})
    })
    .then(res => res.json())
    .then(hiddenGem => dispatch(getHiddenGem(hiddenGem)))
  }
}

function addSongToPile(user, gem, song){
  return (dispatch) => {
    fetch('http://localhost:3000/songs', {
      method: 'POST',
      headers: {"Content-type" : 'application/json'},
      body: JSON.stringify({user: {user_id : user.id},
        gem: {hidden_gem_id: gem.id},
        song: {artist: song.track.artists[0].name,
        name: song.track.name}})
    })
    .then(res => res.json())
    .then(song => dispatch(addGemSongs(song)))
  }
}

function deleteHiddenGem(hiddenGem){
  return (dispatch) => {
    fetch(`http://localhost:3000/hidden_gems/${hiddenGem.id}`, {
      method: "DELETE"
    })
    .then(dispatch(removeGem()),
          dispatch(removeGemSongs()))
    }
}

export {createHiddenGem, addSongToPile, deleteHiddenGem}
