function showPlaylistModal (status){
  return {type: "ACTIVATE_PLAYLIST_MODAL", status}
}

function deactivatePlaylistModal() {
  return {type: 'DEACTIVATE_PLAYLIST_MODAL'}
}

export {showPlaylistModal, deactivatePlaylistModal}
