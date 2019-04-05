import React from 'react';
import {connect} from 'react-redux'
import PlaylistShowCard from '../components/PlaylistShowCard'
import SongsList from './SongsList'

class PlaylistContainer extends React.Component {
  render(){
    return(
      <div>
        {this.props.playlist ? <PlaylistShowCard/> : null}
        {this.props.songs ? <SongsList/> : null}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  playlist: state.playlist,
  songs: state.songs
})

export default connect(mapStateToProps)(PlaylistContainer)
