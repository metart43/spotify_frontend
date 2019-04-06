import React from 'react';
import {connect} from 'react-redux'

const PlaylistShowCard = (props) => {
  debugger
  return (
    <React.Fragment>
    <p><strong>{props.playlist.name}</strong></p>
    <p><img className='image' src={props.playlist.images[0].url} /></p>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  playlist: state.playlist
})

export default connect(mapStateToProps)(PlaylistShowCard)
