import React from 'react';

const PlaylistCard = (props) => {
  debugger
  return (
    <div>
    Name: {props.pl.name}
    <img src={props.pl.images[0].url} />
    </div>
  )
}



export default PlaylistCard
