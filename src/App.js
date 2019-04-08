import React, { Component } from 'react';
import './App.css';
import NavBar from '../src/components/NavBar'
import Locations from '../src/components/Locations'
import PlaylistIndex from '../src/containers/PlaylistIndex'
import PlaylistContainer from '../src/containers/PlaylistContainer'
import SpotifyPlayer from '../src/containers/SpotifyPlayer'
import {connect} from 'react-redux'
// import {withRouter} from 'react-router-dom'
import {accessingToken, fetchingPlaylist} from '../src/redux/actions'


class App extends Component {


componentDidMount(){
   let hashParams = {}
   let e, r = /([^&;=]+)=?([^&;]*)/g,
       q = window.location.hash.substring(1)
   while ( e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2])
   }
  if (hashParams.access_token === undefined){
    return
  } else {
    this.props.accessingToken(hashParams.access_token)
    this.props.fetchingPlaylist(hashParams.access_token)
  }
}

  render() {
    return (
        <div className="App">
          <NavBar />
          <Locations />
          <PlaylistContainer />
          <PlaylistIndex />
          <SpotifyPlayer />
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    playlist: state.playlist,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    accessingToken: (token) => dispatch(accessingToken(token)),
    fetchingPlaylist: (token) => dispatch(fetchingPlaylist(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
