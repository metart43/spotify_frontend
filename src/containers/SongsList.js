import React from 'react';
import {connect} from 'react-redux'
import SongItem from '../components/SongItem'

class SongsList extends React.Component {
  render(){
    return(
      <ul>
          {this.props.songs.items.map(song => <SongItem song={song}/>)}
      </ul>
    )
  }
}

const mapStateToProps = state => ({
  songs: state.songs
})

export default connect(mapStateToProps)(SongsList)
