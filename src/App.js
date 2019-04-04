import React, { Component } from 'react';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js'
import NavBar from '../src/components/NavBar'
import Locations from '../src/components/Locations'
import PlaylistIndex from '../src/containers/PlaylistIndex'
import Player from '../src/containers/Player'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {accessingToken} from '../src/redux/actions'
const spotifyApi = new SpotifyWebApi();

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
  }
}

  render() {
    return (
        <div className="App">
          <NavBar />
          <Locations />
          <PlaylistIndex />
          <Player />
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    accessingToken: (token) => dispatch(accessingToken(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
