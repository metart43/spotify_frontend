import React from 'react';
import SongItem from '../components/SongItem'
import { List } from 'antd'

class SongsList extends React.Component {

  render(){
    debugger
    return(
      <List bordered = {true}>
          {this.props.songs.items.map(song => <SongItem img={this.props.img} key={song.id} song={song}/>)}
      </List>
    )
  }
}

export default SongsList
