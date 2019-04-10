import React from 'react';
import {connect} from 'react-redux'
import SongItem from '../components/SongItem'
import { List } from 'antd'

class SongsList extends React.Component {
  render(){
    return(
      <List>
          {this.props.songs.items.map(song => <SongItem key={song.id} song={song}/>)}
      </List>
    )
  }
}

const mapStateToProps = state => ({
  songs: state.songs
})

export default connect(mapStateToProps)(SongsList)
