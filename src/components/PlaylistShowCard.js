import React from 'react';
import {connect} from 'react-redux'

const PlaylistShowCard = (props) => {
  debugger
  return (
    <div>
    <strong>Name: {props.playlist.name}</strong>
    <img className='image' src={props.playlist.images[0].url} />
    </div>
  )
}

const mapStateToProps = (state) => ({
  playlist: state.playlist
})

export default connect(mapStateToProps)(PlaylistShowCard)
