import React from 'react';
import SongItem from '../components/SongItem'
import { List } from 'antd'

class SongsList extends React.Component {

  render(){
    return(
      <List bordered = {true}>
          {this.props.songs.items.map(song => <SongItem img={this.props.img? this.props.img : song.album? song.album.images[0].url : song.track.album.images[0].url } key={song.id} song={song}/>)}
      </List>
    )
  }
}

export default SongsList
