import React from 'react';
import {connect} from 'react-redux'
import SongItem from '../components/SongItem'

class SongsList extends React.Component {
  render(){
    debugger
    return(
      <div>
          {this.props.songs.map(song => <SongItem song={song}/>)}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  songs: state.songs
})

export default connect(mapStateToProps)(SongsList)
