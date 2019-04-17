import React from 'react';
import {List} from 'antd'
import {Button} from 'antd'
import {connect} from 'react-redux'
import {playingTrackFromGemItem,
  fetchingCurrentSong,
  startPlayback,
  startPlayerActivity} from '../redux/actions'
import {removerSongFromPile} from '../redux/backendActions'

const GemItem = (props) => {
  console.log(props.song);
  return(
    <React.Fragment>
      <List.Item>
        <strong>{props.song.artist}</strong> - {props.song.name}
        &nbsp;
        <Button size={'small'} shape={"circle"} icon={"play-circle"}
          onClick={() =>
            {props.playingTrackFromGemItem(props.token, props.song);
            props.startPlayback(props.playbackStatus);
            setTimeout(() => props.fetchingCurrentSong(props.token), 1000)}
        }></Button>
        &nbsp;&nbsp;
        <Button size={'small'} shape={"circle"} onClick={() => props.removerSongFromPile(props.song)}> <i class="fas fa-heart-broken"></i></Button>
      </List.Item>
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  token: state.token,
  playbackStatus: state.playbackStatus,
  playerStatus: state.playerStatus
})

const mapDispatchToProps = dispatch => ({

  playingTrackFromGemItem: (token, song) => dispatch(playingTrackFromGemItem(token, song)),
  startPlayback: (playbackStatus) => dispatch(startPlayback(playbackStatus)),
  startPlayerActivity: (playerStatus) => dispatch(startPlayerActivity(playerStatus)),
  fetchingCurrentSong: (token) => dispatch(fetchingCurrentSong(token)),
  removerSongFromPile: (song) => dispatch(removerSongFromPile(song))

})

export default connect(mapStateToProps, mapDispatchToProps)(GemItem)
