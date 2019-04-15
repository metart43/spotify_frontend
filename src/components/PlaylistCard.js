import React from 'react';
import {selectPlaylist,
        fetchingSongs,
        playingPlaylist,
        startPlayback,
        fetchingCurrentSong} from '../redux/actions'
import {showPlaylistModal} from '../redux/modalActions'
import {connect} from 'react-redux'
import {Button, Modal} from 'antd'

const PlaylistCard = (props) => {
  return (
    <React.Fragment>
    <Button shape='circle' size='small' onClick={
      () => {props.selectPlaylist(props.pl);
            props.fetchingSongs(props.token, props.pl.id);
            props.showPlaylistModal(props.playlistModalStatus)}}>
    <i className="far fa-eye"></i>
    </Button>
    <Button size='small' shape='circle' icon='play-circle'
    onClick={() => {props.playingPlaylist(props.token, props.pl);
    props.startPlayback(props.playbackStatus);
    setTimeout(() => props.fetchingCurrentSong(props.token), 1000)}}>
    </Button>
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
    playingPlaylist: (token, playlist) => dispatch(playingPlaylist(token, playlist)),
    startPlayback: (playbackStatus) => dispatch(startPlayback(playbackStatus)),
    fetchingCurrentSong: (token) => dispatch(fetchingCurrentSong(token)),
    showPlaylistModal: (status) => dispatch(showPlaylistModal(status))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PlaylistCard)
