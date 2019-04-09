import React from 'react';
import {selectPlaylist, fetchingSongs, playingPlaylist} from '../redux/actions'
import {connect} from 'react-redux'
import {Button} from 'antd'

const PlaylistCard = (props) => {
  //redo the playlist and send the playlist to a spotify player
  return (
    <React.Fragment>
    <p>{props.pl.name}</p>
    <p><img className='image' alt='playlist' src={props.pl.images[0].url} /></p>
    <p><Button size='small' onClick={
      () => {props.selectPlaylist(props.pl); props.fetchingSongs(props.token, props.pl.id);}
    }>Show Me</Button></p>
  <p><Button onClick={() => props.playingPlaylist(props.token, props.pl)}>Play Me</Button></p>
    <Button >Follow me</Button>
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
    playingPlaylist: (token, playlist) => dispatch(playingPlaylist(token, playlist))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PlaylistCard)
