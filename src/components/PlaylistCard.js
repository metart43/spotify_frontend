import React from 'react';
import {selectPlaylist, fetchingSongs} from '../redux/actions'
import {connect} from 'react-redux'

const PlaylistCard = (props) => {
  console.log(props);
  return (
    <div>
    Name: {props.pl.name}
    <img className='image' alt='playlist' src={props.pl.images[0].url} />
    <button onClick={
      () => props.selectPlaylist(props.pl),
      () => props.fetchingSongs(props.token, props.pl.id)
    }>Play me</button>
    </div>
  )
}

const mapStateToProps = state => ({
  token: state.token
})

const mapDispatchToProps = dispatch => {
  return {
    selectPlaylist: (playlist) => dispatch(selectPlaylist(playlist)),
    fetchingSongs: (token, playlistId) => dispatch(fetchingSongs(token, playlistId))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PlaylistCard)
