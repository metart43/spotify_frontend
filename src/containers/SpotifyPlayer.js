import React, {Component} from 'react';
import {Button} from 'antd'
import {connect} from 'react-redux'
import {playingTrack, fetchingCurrentSong} from '../redux/actions'


class SpotifyPlayer extends Component {
  //functionality

  componentDidUpdate(prevProps){
    debugger
      if (this.props.currentSong != null && prevProps.currentSong != null){
    if (this.props.currentSong.item.name == prevProps.currentSong.item.name) {
      console.log('identic');
      this.props.fetchingCurrentSong(this.props.token)
    }
    else {
      return
      }
    }
  }

  render(){
    return (<div>
  {this.props.currentSong ? `Artist: ${this.props.currentSong.item.artists[0].name} - Track: ${this.props.currentSong.item.name}`: console.log('no')}
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
  fetchingCurrentSong: (token) => dispatch(fetchingCurrentSong(token))
})

export default connect(mapStateToProps,mapDispatchToProps)(SpotifyPlayer)
