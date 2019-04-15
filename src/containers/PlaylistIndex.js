import React from 'react';
import PlaylistCard from '../components/PlaylistCard'
import {connect} from 'react-redux'
import {fetchingPlaylist, selectPlaylist, fetchingSongs} from '../redux/actions'
import {showPlaylistModal} from '../redux/modalActions'
import {Card, Row, Col, Avatar, Icon} from 'antd'

const { Meta } = Card

class PlaylistIndex extends React.Component {

  render(){
    return (
      <Row gutter={16} id={'playListIndex'}justify="center" type='flex'>
        {this.props.playlists.map((pl =><Col id={'cardColumn'} key={pl.id} span={4}> <Card hoverable size="small" title={pl.name} cover={<img alt="example" onClick={
          () => {this.props.selectPlaylist(pl);
                this.props.fetchingSongs(this.props.token, pl.id);
                this.props.showPlaylistModal(this.props.playlistModalStatus)}} src={pl.images[0].url} />} className='playlistCard'><PlaylistCard key={pl.id} pl={pl}/></Card></Col>))}
      </Row>
  )
  }
}

const mapStateToProps = state => ({
  token: state.token,
  playlists: state.playlists,
  playlistModalStatus: state.playlistModalStatus
})

const mapDispatchToProps = dispatch => {
  return {
    selectPlaylist: (playlist) => dispatch(selectPlaylist(playlist)),
    fetchingSongs: (token, playlistId) => dispatch(fetchingSongs(token, playlistId)),
    fetchingPlaylist: (token) => dispatch(fetchingPlaylist(token)),
    showPlaylistModal: (status) => dispatch(showPlaylistModal(status))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistIndex)
