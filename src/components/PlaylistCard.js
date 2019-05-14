import React from 'react';
import {selectPlaylist,
        fetchingSongs,
        startPlayback,
        fetchingCurrentSong} from '../redux/actions'
import {showPlaylistModal} from '../redux/modalActions'
import {connect} from 'react-redux'


const PlaylistCard = (props) => {
  return (
    <React.Fragment>
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  token: state.token,
  playlistModalStatus: state.playlistModalStatus
})

const mapDispatchToProps = dispatch => {
  return {
    selectPlaylist: (playlist) => dispatch(selectPlaylist(playlist)),
    fetchingSongs: (token, playlistId) => dispatch(fetchingSongs(token, playlistId)),
    startPlayback: (playbackStatus) => dispatch(startPlayback(playbackStatus)),
    fetchingCurrentSong: (token) => dispatch(fetchingCurrentSong(token)),
    showPlaylistModal: (status) => dispatch(showPlaylistModal(status))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PlaylistCard)
