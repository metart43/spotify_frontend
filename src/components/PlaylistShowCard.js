import React from 'react';
import {connect} from 'react-redux'
import {Modal} from 'antd'

const PlaylistShowCard = (props) => {
  return (
    <React.Fragment>
    <p><strong>{props.playlist.name}</strong></p>
    <p><img className='image' alt='PlaylistShowCard' src={props.playlist.images[0].url} /></p>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  playlist: state.playlist
})

export default connect(mapStateToProps)(PlaylistShowCard)
