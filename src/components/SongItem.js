import React from 'react';
import {List} from 'antd'
import {Button} from 'antd'
import {connect} from 'react-redux'
import {playingTrack,
  fetchingCurrentSong,
  startPlayback,
  startPlayerActivity,
  fetchArtist} from '../redux/actions'
import { NavLink, Redirect} from 'react-router-dom';
import {addSongToPile} from '../redux/backendActions'

const SongItem = (props) => {
  return(
    <React.Fragment>
      <List.Item>
        <strong>{props.song.track.artists[0].name}</strong> - {props.song.track.name}
        &nbsp;
        <Button size={'small'} shape={"circle"} icon={"play-circle"}
          onClick={() =>
            {props.playingTrack(props.token, props.song);
            props.startPlayback(props.playbackStatus);
            setTimeout(() => props.fetchingCurrentSong(props.token), 1000)}
        }></Button>
        &nbsp;&nbsp;
        <Button size={'small'} shape={"circle"} onClick={() => props.addSongToPile(props.user, props.hiddenGem, props.song)}> <i class="far fa-gem"></i></Button>
        <NavLink to={'/artist'}>
        <Button  size={'small'} shape={"circle"} onClick={() => props.fetchArtist(props.token, props.song.track.artists[0].id)}><i class="fas fa-guitar"></i></Button>
        </NavLink>
      </List.Item>
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  token: state.token,
  playbackStatus: state.playbackStatus,
  playerStatus: state.playerStatus,
  hiddenGem: state.hiddenGem,
  user: state.user
})

const mapDispatchToProps = dispatch => ({

  playingTrack: (token, song) => dispatch(playingTrack(token, song)),
  startPlayback: (playbackStatus) => dispatch(startPlayback(playbackStatus)),
  startPlayerActivity: (playerStatus) => dispatch(startPlayerActivity(playerStatus)),
  fetchingCurrentSong: (token) => dispatch(fetchingCurrentSong(token)),
  addSongToPile: (user, gem, song) => dispatch(addSongToPile(user, gem, song)),
  fetchArtist: (token, artistId) => dispatch(fetchArtist(token, artistId))

})

export default connect(mapStateToProps, mapDispatchToProps)(SongItem)
