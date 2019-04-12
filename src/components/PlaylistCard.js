import React from 'react';
import {selectPlaylist, fetchingSongs, playingPlaylist, startPlayback, fetchingCurrentSong} from '../redux/actions'
import {connect} from 'react-redux'
import {Button} from 'antd'

const PlaylistCard = (props) => {
  //redo the playlist and send the playlist to a spotify player
  return (
    <React.Fragment>
    <p>{props.pl.name}</p>
    <p><img className='image' alt='playlist' src={props.pl.images[0].url} /></p>
    <Button shape='circle' size='small' icon='' onClick={
      () => {props.selectPlaylist(props.pl);
            props.fetchingSongs(props.token, props.pl.id);}}>
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
  token: state.token
})

const mapDispatchToProps = dispatch => {
  return {
    selectPlaylist: (playlist) => dispatch(selectPlaylist(playlist)),
    fetchingSongs: (token, playlistId) => dispatch(fetchingSongs(token, playlistId)),
    playingPlaylist: (token, playlist) => dispatch(playingPlaylist(token, playlist)),
    startPlayback: (playbackStatus) => dispatch(startPlayback(playbackStatus)),
    fetchingCurrentSong: (token) => dispatch(fetchingCurrentSong(token))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PlaylistCard)
