import React, { Component } from 'react';
import './App.css';
import NavBar from '../src/components/NavBar'
import Locations from '../src/components/Locations'
import PlaylistIndex from '../src/containers/PlaylistIndex'
import PlaylistContainer from '../src/containers/PlaylistContainer'
import SpotifyPlayer from '../src/containers/SpotifyPlayer'
import HiddenGem from '../src/containers/HiddenGem'
import SignIn from '../src/components/SignIn'
import WelcomePage from '../src/components/WelcomePage'
import ArtistShowPage from '../src/components/ArtistShowPage'
import {connect} from 'react-redux'
import {Route, Redirect, Switch} from 'react-router-dom'
import {accessingToken, fetchingPlaylist, settingUser, fetchingCurrentSong, getAvaliableDevicesRedux} from '../src/redux/actions'
import {Layout} from 'antd'

const {Header, Content, Footer} = Layout

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
    localStorage.setItem('token', hashParams.access_token)
    this.props.fetchingPlaylist(hashParams.access_token)
    this.props.settingUser(hashParams.access_token)

  }
}

  componentDidUpdate(prevProps){
    if (prevProps.user != this.props.user ) {
      this.props.getAvaliableDevicesRedux(this.props.token, this.props.user)
    }
  }

  render() {
    return (
        <Layout className="App">
          <Header><NavBar /></Header>
          <Content>
            {this.props.pileToggleStatus?  <HiddenGem/> : null}
          <Switch>
          {this.props.artist? <Route path='/artist' render={()=> <ArtistShowPage/>} /> : null}
          <Route path='/playlists' render={() => <PlaylistIndex />} />
          <Route path='/' render={() => <WelcomePage />} />
          </Switch>
          <PlaylistContainer />
          </Content>
          {this.props.user? <SpotifyPlayer id={"spotifyPlayer"}/> : null}
        </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    playlist: state.playlist,
    user: state.user,
    devicesRedux: state.devicesRedux,
    hiddenGem: state.hiddenGem,
    pileToggleStatus: state.pileToggleStatus,
    artist: state.artist,
    token: state.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    accessingToken: (token) => dispatch(accessingToken(token)),
    fetchingPlaylist: (token) => dispatch(fetchingPlaylist(token)),
    settingUser: (token) => dispatch(settingUser(token)),
    fetchingCurrentSong: (token) => dispatch(fetchingCurrentSong(token)),
    getAvaliableDevicesRedux: (token, user) => dispatch(getAvaliableDevicesRedux(token, user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
