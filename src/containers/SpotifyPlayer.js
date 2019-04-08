import React from 'react';
import {Button} from 'antd'
import {connect} from 'react-redux'
import {playingTrack, currentSong} from '../redux/actions'


const SpotifyPlayer = (props) => {

return (<div>
  <Button className={'playerButtons'} icon={'backward'} size={'large'} onClick={() => props.playingTrack(props.token)} shape={'circle'}/>
  <Button className={'playerButtons'} icon={'play-circle'} size={'large'} onClick={() => props.playingTrack(props.token)} shape={'circle'}/>
  <Button className={'playerButtons'} icon={'forward'} size={'large'} onClick={() => props.playingTrack(props.token)} shape={'circle'}/>

  </div>)
}

const mapStateToProps = state => ({
  token: state.token
})

const mapDispatchToProps = dispatch => ({
  playingTrack: (token) => dispatch(playingTrack(token))
})

export default connect(mapStateToProps,mapDispatchToProps)(SpotifyPlayer)
