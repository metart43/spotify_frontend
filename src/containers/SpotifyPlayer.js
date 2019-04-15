import React, {Component} from 'react';
import {Button, Col, Row, List, Layout} from 'antd'
import {connect} from 'react-redux'
import {playingTrack,
  fetchingCurrentSong,
  pausingPlaybackFetch,
  pausePlayback,
  startPlayback,
  startPlayerActivity,
  playNext,
  playPrevious,
  playResume} from '../redux/actions'

const { Footer } = Layout

class SpotifyPlayer extends Component {

  render(){
    return (
  <React.Fragment>
    <Row type="flex" justify="center" align="middle">
      {this.props.currentSong? `${this.props.currentSong.item.name} - ${this.props.currentSong.item.artists[0].name} `: console.log('no song')}
      </Row>
      <Row type="flex" justify="center" align="middle">
  <Col><List.Item></List.Item><Button className={'playerButtons'} icon={'backward'} size={'large'} shape={'circle'}
      onClick={() =>
      {this.props.playPrevious(this.props.token);
      setTimeout(() => this.props.fetchingCurrentSong(this.props.token), 1000)}}/>
  {this.props.playbackStatus? <Button className={'playerButtons'} icon={'pause-circle'}
      onClick={() => {this.props.pausingPlaybackFetch(this.props.token);
      this.props.pausePlayback(this.props.playbackStatus);
      setTimeout(() => this.props.fetchingCurrentSong(this.props.token), 1000)}} size={'large'} shape={'circle'}/>
    :
  <Button className={'playerButtons'} icon={'play-circle'}
      onClick={() => {this.props.playResume(this.props.token);
        this.props.startPlayback(this.props.playbackStatus);
        setTimeout(() => this.props.fetchingCurrentSong(this.props.token), 1000)}}
      size={'large'} shape={'circle'}/>}
  <Button className={'playerButtons'} icon={'forward'} size={'large'} shape={'circle'}
    onClick={() => {this.props.playNext(this.props.token);
      setTimeout(() => this.props.fetchingCurrentSong(this.props.token), 1000)}}/></Col>
      </Row>
</React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  token: state.token,
  currentSong: state.currentSong,
  playbackStatus: state.playbackStatus,
  playerStatus: state.playerStatus
})

const mapDispatchToProps = dispatch => ({
  fetchingCurrentSong: (token) => dispatch(fetchingCurrentSong(token)),
  pausingPlaybackFetch: (token) => dispatch(pausingPlaybackFetch(token)),
  pausePlayback: (playbackStatus) => dispatch(pausePlayback(playbackStatus)),
  playingTrack: (token, song) => dispatch(playingTrack(token, song)),
  startPlayback: (playbackStatus) => dispatch(startPlayback(playbackStatus)),
  startPlayerActivity: (playerStatus) => dispatch(startPlayerActivity(playerStatus)),
  playNext: (token) => dispatch(playNext(token)),
  playPrevious: (token) => dispatch(playNext(token)),
  playResume: (token) => dispatch(playResume(token))
})

export default connect(mapStateToProps,mapDispatchToProps)(SpotifyPlayer)
