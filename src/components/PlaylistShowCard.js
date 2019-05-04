import React from 'react';

const PlaylistShowCard = (props) => {
  return (
    <React.Fragment>
    <p><strong>{props.playlist.name}</strong></p>
    <p><img className='image' alt='PlaylistShowCard' src={props.playlist.images[0].url} /></p>
    </React.Fragment>
  )
}


export default PlaylistShowCard
