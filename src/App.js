import React, { Component } from 'react';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js'
import NavBar from '../src/components/NavBar'
import Locations from '../src/components/Locations'
import PlaylistIndex from '../src/containers/PlaylistIndex'
import Player from '../src/containers/Player'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor(){
    super()
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
  }

  getNowPlaying = () => {
    spotifyApi.getUserPlaylists()
  .then(function(data) {
    console.log('User playlists', data);
  }, function(err) {
    console.error(err);
  });
}

   getHashParams() {
    let hashParams = {}
    let e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1)
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2])
    }
    console.log(hashParams);
    return hashParams
  }


  render() {
    return (
        <div className="App">
          <NavBar />
          <button><a href='http://localhost:3000/api/v1/login'> Sing in </a></button>
          <button onClick={this.getNowPlaying}> Playlists </button>
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

  }
}

export default connect(mapStateToProps)(App);
