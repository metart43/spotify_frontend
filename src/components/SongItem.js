import React from 'react';
// import {connect} from 'react-redux'

const SongItem = (props) => {
  return(
    <div>
    Name: {props.song.track.name}
    </div>
  )
}



export default (SongItem)
