import React from 'react';

const SongItem = (props) => {
  return(
    <div>
    Name: {props.song.track.name}
    </div>
  )
}



export default (SongItem)
