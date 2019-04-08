import React from 'react';
import {List} from 'antd'
import {Button} from 'antd'
import {connect} from 'react-redux'
import {playingTrack} from '../redux/actions'

const SongItem = (props) => {
  return(
    <React.Fragment>
      <List.Item>
        <strong>{props.song.track.artists[0].name}</strong> - {props.song.track.name}
        &nbsp;
        <Button size={'small'} shape={"circle"} icon={"play-circle"} onClick={() => props.playingTrack(props.song.track, props.token)}></Button>
        &nbsp;&nbsp;
        <Button size={'small'} shape={"circle"} icon={"fire"}></Button>
      </List.Item>
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  token: state.token
})

const mapDispatchToProps = dispatch => ({

  playingTrack: (song, token) => dispatch(playingTrack(song, token))

})

export default connect(mapStateToProps, mapDispatchToProps)(SongItem)
