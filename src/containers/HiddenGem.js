import React from 'react';
import {connect} from 'react-redux'
import {deleteHiddenGem} from '../redux/backendActions'
import {List, Avatar, Button} from 'antd'

class HiddenGem extends React.Component {

  render(){
    debugger
    return(
      <React.Fragment>
        {this.props.hiddenGem? this.props.hiddenGem.name : console.log('no name')}
        {this.props.gemSongs.length != 0? this.props.gemSongs[0].name : console.log('no songs')}
        <Button onClick={() => this.props.deleteHiddenGem(this.props.hiddenGem)}>Scrap A Pile</Button>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  hiddenGem: state.hiddenGem,
  gemSongs: state.gemSongs
})

const mapDispatchToProps = dispatch => ({
  deleteHiddenGem: (hiddenGem) => dispatch(deleteHiddenGem(hiddenGem))
})

export default connect(mapStateToProps, mapDispatchToProps)(HiddenGem)
