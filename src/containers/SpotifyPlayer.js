import React, {Component} from 'react';
import {Button, Col, Row, List, Layout, Typography, Dropdown, Icon, Menu} from 'antd'
import {connect} from 'react-redux'
import {playingTrack,
  fetchingCurrentSong,
  pausingPlaybackFetch,
  pausePlayback,
  startPlayback,
  startPlayerActivity,
  playNext,
  playPrevious,
  playResume,
  getAvaliableDevices} from '../redux/actions'

const { Footer } = Layout
const { Text } = Typography




class SpotifyPlayer extends Component {

  constructor(){
    super()
    this.state = {
      devices : []
    }
  }

   getAvaliableDevices(token, user){
      fetch(`https://api.spotify.com/v1/me/player/devices`, {
        headers: {"Accept" : "application/json",
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${token}`}
      })
      .then(res => res.json())
      .then(data => this.setState({
        devices: data.devices}))
    }

    transferPlayback(token, deviceId){
      fetch('https://api.spotify.com/v1/me/player',{
        method: 'PUT',
        headers: {"Accept" : "application/json",
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${token}`},
        body: JSON.stringify({"device_ids": [`${deviceId}`]})
      })
      .then(res => console.log(res))
    }

  render(){
    return (
    <div id={"spotifyPlayer"}>
    <Row>
      <Col span={2} offset={2}>{this.props.currentSong? <img className={'playerThumbnail'} src={this.props.currentSong.item.album.images[0].url}></img> : null}</Col>
    <Col span={6}>
      <Text strong><p>{this.props.currentSong? `${this.props.currentSong.item.artists[0].name}`: null}</p></Text>
      <p><Text secondary>{this.props.currentSong? this.props.currentSong.item.name : null}</Text></p>
    </Col>
      <Col span={8}>
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
        <Col span={2}>
          <Dropdown onFocus={() => this.getAvaliableDevices(this.props.token, this.props.user)} overlay={<Menu>
            {this.state.devices.map(device => <Menu.Item onClick={() => this.transferPlayback(this.props.token, device.id)}>{device.name}</Menu.Item> )}
          </Menu>}>
          <Button shape={'circle'} icon={"sync"}/>
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
