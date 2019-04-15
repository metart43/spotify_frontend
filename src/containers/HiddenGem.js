import React from 'react';
import {connect} from 'react-redux'
import {deleteHiddenGem} from '../redux/backendActions'
import {togglePileAction} from '../redux/toggleActions'
import {List, Avatar, Button} from 'antd'
import GemItem from '../components/GemItem'

class HiddenGem extends React.Component {
  render(){
    return(
      <React.Fragment>
        {this.props.hiddenGem? this.props.hiddenGem.name : console.log('no name')}
        <List>
        {this.props.gemSongs.length > 0 ? this.props.gemSongs.map(song => <GemItem key={song.id} song={song}/>) : console.log('no songs')}
        </List>
        <Button onClick={() => {this.props.deleteHiddenGem(this.props.hiddenGem)}}>Scrap A Pile</Button>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  hiddenGem: state.hiddenGem,
  gemSongs: state.gemSongs,
  togglePile: state.togglePile
})

const mapDispatchToProps = dispatch => ({
  deleteHiddenGem: (hiddenGem) => dispatch(deleteHiddenGem(hiddenGem)),
  togglePileAction: (status) => dispatch(togglePileAction(status))
})

export default connect(mapStateToProps, mapDispatchToProps)(HiddenGem)
