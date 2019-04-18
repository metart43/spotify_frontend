import React from 'react';
import {connect} from 'react-redux'
import {fetchingPlaylist,
        selectPlaylist,
        fetchingSongs,
        playingPlaylist,
        startPlayback,
        fetchingCurrentSong} from '../redux/actions'
import {showPlaylistModal} from '../redux/modalActions'
import {Card, Row, Col, Avatar, Icon, Button, Layout} from 'antd'

const { Meta } = Card

class AlbumPage extends React.Component {

  render(){
    return (
      <Layout style={{height: '100vh', background: 'white'}}>
      <Row gutter={16} id={'playListIndex'}justify="center" type='flex'>
        {this.props.artistAlbums.map((album =><Col id={'cardColumn'} key={album.id} span={4}>
        <Card hoverable size="small" title={album.name}
        cover={<img alt="example" src={album.images[0].url} />}
         className='playlistCard'
         actions={[<Button size='small' shape='circle' icon='play-circle'
         onClick={() => {this.props.playingPlaylist(this.props.token, album, this.props.currentDevice);
         this.props.startPlayback(this.props.playbackStatus);
         setTimeout(() => this.props.fetchingCurrentSong(this.props.token), 1000)}}>
       </Button>]}> </Card>
        </Col>))}
      </Row>
      </Layout>
  )
  }
}

const mapStateToProps = state => ({
  token: state.token,
  artistAlbums: state.artistAlbums,
  currentDevice: state.currentDevice
})

const mapDispatchToProps = dispatch => {
  return {
    startPlayback: (playbackStatus) => dispatch(startPlayback(playbackStatus)),
    fetchingCurrentSong: (token) => dispatch(fetchingCurrentSong(token)),
    playingPlaylist: (token, album) => dispatch(playingPlaylist(token, album))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumPage)
