import React, { Component } from 'react';
import './App.css';
import NavBar from '../src/components/NavBar'
import Locations from '../src/components/Locations'
import PlaylistIndex from '../src/containers/PlaylistIndex'
import PlaylistContainer from '../src/containers/PlaylistContainer'
import SpotifyPlayer from '../src/containers/SpotifyPlayer'
import HiddenGem from '../src/containers/HiddenGem'
import {connect} from 'react-redux'
import {Route, Redirect, Switch } from 'react-router-dom'
import {accessingToken, fetchingPlaylist, settingUser} from '../src/redux/actions'
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
    this.props.fetchingPlaylist(hashParams.access_token)
    this.props.settingUser(hashParams.access_token)
  }
}

  render() {
    return (
        <Layout className="App">
          <Header><NavBar /></Header>
          <Content>
          <Switch>
          {this.props.pileToggleStatus? <Route path='/gem' render={() => <HiddenGem/>} /> : null}
          </Switch>
          <PlaylistContainer />
          <PlaylistIndex />
          </Content>
          <Footer className={'footer'}><SpotifyPlayer /></Footer>
        </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    playlist: state.playlist,
    user: state.user,
    hiddenGem: state.hiddenGem,
    pileToggleStatus: state.pileToggleStatus
  }
}

const mapDispatchToProps = dispatch => {
  return {
    accessingToken: (token) => dispatch(accessingToken(token)),
    fetchingPlaylist: (token) => dispatch(fetchingPlaylist(token)),
    settingUser: (token) => dispatch(settingUser(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
