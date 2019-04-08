import React, {Component} from 'react';
import {Button} from 'antd'
import {connect} from 'react-redux'
import {playingTrack, currentSong} from '../redux/actions'


class SpotifyPlayer extends Component {
  //functionality
  render(){
    return (<div>
  {this.props.currentSong? `Artist: ${this.props.currentSong.track.artists[0].name} - Track: ${this.props.currentSong.track.name}`: console.log('no')}
  <Button className={'playerButtons'} icon={'backward'} size={'large'} shape={'circle'}/>
  <Button className={'playerButtons'} icon={'play-circle'} size={'large'} shape={'circle'}/>
  <Button className={'playerButtons'} icon={'forward'} size={'large'} shape={'circle'}/>
  </div>)
  }
}

const mapStateToProps = state => ({
  token: state.token,
  currentSong: state.currentSong
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps,mapDispatchToProps)(SpotifyPlayer)
