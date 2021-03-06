import React, {Component} from 'react';
import {Button, Col, Row, Typography, Dropdown, Menu} from 'antd'
import {connect} from 'react-redux'
import {
  fetchingCurrentSong,
  pausingPlaybackFetch,
  pausePlayback,
  startPlayback,
  startPlayerActivity,
  playNext,
  playPrevious,
  playResume,
  getAvaliableDevicesRedux,
  transferPlayback} from '../redux/actions'

const { Text } = Typography




class SpotifyPlayer extends Component {


  render(){
    return (
    <div id={"spotifyPlayer"}>
    <Row>
      <Col span={2} offset={2}>{this.props.currentSong? <img alt='playerThumbnail' className={'playerThumbnail'} src={this.props.currentSong.item.album.images[0].url}></img> : null}</Col>
    <Col span={6}>
      <Text strong><p>{this.props.currentSong? `${this.props.currentSong.item.artists[0].name}`: null}</p></Text>
      <p><Text secondary>{this.props.currentSong? this.props.currentSong.item.name : null}</Text></p>
    </Col>
      <Col span={8}>
              <Button className={'playerButtons'} icon={'backward'} size={'large'} shape={'circle'}
          onClick={() =>
          {this.props.playPrevious(this.props.token, this.props.currentDevice);
          setTimeout(() => this.props.fetchingCurrentSong(this.props.token), 1000)}}/>
      {this.props.playbackStatus? <Button className={'playerButtons'} icon={'pause-circle'}
          onClick={() => {this.props.pausingPlaybackFetch(this.props.token,  this.props.currentDevice);
          this.props.pausePlayback(this.props.playbackStatus);
          setTimeout(() => this.props.fetchingCurrentSong(this.props.token), 1000)}} size={'large'} shape={'circle'}/>
        :
      <Button className={'playerButtons'} icon={'play-circle'}
          onClick={() => {this.props.playResume(this.props.token,  this.props.currentDevice);
            this.props.startPlayback(this.props.playbackStatus);
            setTimeout(() => this.props.fetchingCurrentSong(this.props.token), 1000)}}
          size={'large'} shape={'circle'}/>}
      <Button className={'playerButtons'} icon={'forward'} size={'large'} shape={'circle'}
        onClick={() => {this.props.playNext(this.props.token, this.props.currentDevice);
          setTimeout(() => this.props.fetchingCurrentSong(this.props.token), 1000)}}/>
        </Col>
        <Col span={2}>
          <Dropdown placement="topCenter" onFocus={() => this.props.getAvaliableDevicesRedux(this.props.token, this.props.user)} overlay={<Menu>
            {this.props.devicesRedux.map(device => <Menu.Item onClick={() => this.props.transferPlayback(this.props.token, device.id)}>{device.name}</Menu.Item> )}
          </Menu>}>
          <Button id={"deviceButton"} shape={'circle'} size={'small'} icon={"sync"}/>
          </Dropdown>
  </Col>
  </Row>
  </div>
    )
  }
}

const mapStateToProps = state => ({
  token: state.token,
  currentSong: state.currentSong,
  playbackStatus: state.playbackStatus,
  playerStatus: state.playerStatus,
  currentDevice: state.currentDevice,
  devicesRedux: state.devicesRedux
})

const mapDispatchToProps = dispatch => ({
  fetchingCurrentSong: (token) => dispatch(fetchingCurrentSong(token)),
  pausingPlaybackFetch: (token, device) => dispatch(pausingPlaybackFetch(token, device)),
  pausePlayback: (playbackStatus) => dispatch(pausePlayback(playbackStatus)),
  startPlayback: (playbackStatus) => dispatch(startPlayback(playbackStatus)),
  startPlayerActivity: (playerStatus) => dispatch(startPlayerActivity(playerStatus)),
  playNext: (token, device) => dispatch(playNext(token, device)),
  playPrevious: (token, device) => dispatch(playPrevious(token, device)),
  playResume: (token, device) => dispatch(playResume(token, device)),
  transferPlayback: (token, device) => dispatch(transferPlayback(token, device)),
  getAvaliableDevicesRedux: (token, user) => dispatch(getAvaliableDevicesRedux(token, user))
})

export default connect(mapStateToProps,mapDispatchToProps)(SpotifyPlayer)
