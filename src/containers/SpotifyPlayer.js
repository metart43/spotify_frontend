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
  playPrevious} from '../redux/actions'

const { Footer } = Layout

class SpotifyPlayer extends Component {

  render(){
    return (
  <React.Fragment>
      <Row type="flex" justify="space-around" align="middle" className={'currentTrack'}>
  {this.props.currentSong ? `${this.props.currentSong.track.artists[0].name} - ${this.props.currentSong.track.name}`: console.log('no')}</Row>
      <Row type="flex" justify="space-around" align="middle">
  <Col><List.Item></List.Item><Button className={'playerButtons'} icon={'backward'} size={'large'} shape={'circle'}
    onClick={() => this.props.playPrevious(this.props.token)}/>
  {this.props.playbackStatus? <Button className={'playerButtons'} icon={'pause-circle'}
      onClick={() => {this.props.pausingPlaybackFetch(this.props.token); this.props.pausePlayback(this.props.playbackStatus); }} size={'large'} shape={'circle'}/>
    :
  <Button className={'playerButtons'} icon={'play-circle'}
      onClick={() => {this.props.playingTrack(this.props.token, this.props.currentSong); this.props.startPlayback(this.props.playbackStatus); }}
      size={'large'} shape={'circle'}/>}
  <Button className={'playerButtons'} icon={'forward'} size={'large'} shape={'circle'}
    onClick={() => this.props.playNext(this.props.token)}/></Col>
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
  playPrevious: (token) => dispatch(playNext(token))
})

export default connect(mapStateToProps,mapDispatchToProps)(SpotifyPlayer)
