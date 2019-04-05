import React from 'react';
import PlaylistCard from '../components/PlaylistCard'
import {connect} from 'react-redux'
import {fetchingPlaylist} from '../redux/actions'


class PlaylistIndex extends React.Component {

  render(){
    return (
      <div>
        {this.props.playlists.map((pl => <PlaylistCard key={pl.id} pl={pl}/>))}
      </div>
  )
  }
}

const mapStateToProps = state => ({
  token: state.token,
  playlists: state.playlists
})

const mapDispatchToProps = dispatch => {
  return {
    fetchingPlaylist: (token) => dispatch(fetchingPlaylist(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistIndex)
