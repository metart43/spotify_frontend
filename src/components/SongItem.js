import React from 'react';
import {List} from 'antd'
import {Button} from 'antd'
import {connect} from 'react-redux'
import {playingTrack, fetchingCurrentSong, startPlayback, startPlayerActivity} from '../redux/actions'

const SongItem = (props) => {
  return(
    <React.Fragment>
      <List.Item>
        <strong>{props.song.track.artists[0].name}</strong> - {props.song.track.name}
        &nbsp;
        <Button size={'small'} shape={"circle"} icon={"play-circle"}
          onClick={() =>
            {props.playingTrack(props.token, props.song);
            props.startPlayback(props.playbackStatus);}
        }></Button>
        &nbsp;&nbsp;
        <Button size={'small'} shape={"circle"} icon={"fire"}></Button>
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

  playingTrack: (token, song) => dispatch(playingTrack(token, song)),
  fetchingCurrentSong: (token, song) => dispatch(fetchingCurrentSong(token, song)),
  startPlayback: (playbackStatus) => dispatch(startPlayback(playbackStatus)),
  startPlayerActivity: (playerStatus) => dispatch(startPlayerActivity(playerStatus))

})

export default connect(mapStateToProps, mapDispatchToProps)(SongItem)

// props.startPlayerActivity(props.playerStatus)}
