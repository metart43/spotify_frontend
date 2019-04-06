import React from 'react';

const SongItem = (props) => {
  return(
    <li>
    {props.song.track.name}
  </li>
  )
}



export default (SongItem)
