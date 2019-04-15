import React from 'react';
import {connect} from 'react-redux'
import PlaylistShowCard from '../components/PlaylistShowCard'
import {deactivatePlaylistModal} from '../redux/modalActions'
import SongsList from './SongsList'
import {Row, Col, Modal, Button} from 'antd'

class PlaylistContainer extends React.Component {

  render(){
    return(
    <React.Fragment>
      <Modal visible={this.props.playlistModalStatus}
        width={1000}
        footer={[
            <Button key="back" onClick={() => this.props.deactivatePlaylistModal(this.props.playlistModalStatus)}>Enough!</Button>
          ]}>
      <Row type="flex" justify="space-around" align="middle">
        <Col span={4}>
          {this.props.playlist ? <PlaylistShowCard/> : null}
          </Col>
          <Col span={12}>
        {this.props.songs ? <SongsList/> : null}
      </Col>
      </Row>
    </Modal>
    </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  playlist: state.playlist,
  songs: state.songs,
  playlistModalStatus: state.playlistModalStatus
})

const mapDispatchToProps = dispatch => ({
  deactivatePlaylistModal: (status) => dispatch(deactivatePlaylistModal(status))
})

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistContainer)
