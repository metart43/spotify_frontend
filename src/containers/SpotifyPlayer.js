import React, {Component} from 'react';
import {Button, Col, Row, List, Layout, Typography} from 'antd'
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
const { Text } = Typography

class SpotifyPlayer extends Component {

  render(){
    debugger
    return (
  <React.Fragment>
    <div id={'spotifyPlayer'}>
    <Row >
      <Col span={2} offset={2}>{this.props.currentSong? <img className={'playerThumbnail'} src={this.props.currentSong.item.album.images[0].url}></img> : null}</Col>
    <Text strong><Col span={6}>{this.props.currentSong? `${this.props.currentSong.item.artists[0].name}`: null}</Col></Text>
        <Col span={12}>
              <Button className={'playerButtons'} icon={'backward'} size={'large'} shape={'circle'}
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
          setTimeout(() => this.props.fetchingCurrentSong(this.props.token), 1000)}}/>
        </Col>
  </Row>
  <Row>
    <Col span={4}></Col>
    <Col span={6} id={'playerBottomRow'}>{this.props.currentSong? this.props.currentSong.item.name : null}</Col>
  </Row>
      </div>
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
// {this.props.currentSong? <img className={'playerThumbnail'} src={this.props.currentSong.item.album.images[0].url}></img> : null}</Col>
