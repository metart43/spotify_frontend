import React from 'react';
import {connect} from 'react-redux'
import {getTopSongs,
        playingTrackFromGemItem,
        fetchingCurrentSong,
        startPlayback,
        getSimiliarArtist,
        fetchArtist,
        playingPlaylist,
        fetchingAlbum} from '../redux/actions'
import {addSongToPile} from '../redux/backendActions'
import {Card, Row, Modal, Button, List, Avatar, Col, Layout, message} from 'antd'
import AlbumContainer from '../containers/AlbumContainer'

const {Meta} = Card


class ArtistShowPage extends React.Component {
  constructor(){
    super()
    this.state = {
      visible: false,
      visibleSimiliar: false,
      visibleAlbum: false
  }
}

  showModal = (e) => {
    switch (e.target.innerText) {
      case "Similiar":
      setTimeout(() => {
        this.setState({
          visibleSimiliar: true,
        })}, 500)
        break;
      case 'Top 5':
      setTimeout(() => {
        this.setState({
          visible: true,
        })}, 500)
        break;
      case "":
      setTimeout(() => {
        this.setState({
          visibleAlbum: true,
        })}, 500)
        break;
        default:
        break;
    }
  }

  handleCancel = (e) => {
      this.setState({ visible: false });
    }

  handleSimiliarOk = (e) => {
    this.setState({
      visibleSimiliar: false,
    })
  }

  handleAlbumOk = () => {
    this.setState({
      visibleAlbum: false
    })
  }


render(){
  return(
    <Layout style={{height: '130vh', background: 'white'}}>
    <Row type='flex' justify='center' align="middle">
      <Col span={4}>
    <Card size='small' cover={<img alt='artistImage' src={this.props.artist.images[1].url} />}
      actions={[<Button onClick={(e) => {
        this.props.getTopSongs(this.props.token, this.props.artist.id);
        this.showModal(e)} }>Top 5</Button>,
        <Button onClick={(e) => {
        this.showModal(e);
        this.props.getSimiliarArtist(this.props.token, this.props.artist.id)}}> Similiar</Button>]}>
    <Meta
      title={this.props.artist.name}
      description={this.props.artist.genres[0]}
    /></Card>
    <Modal
      title="Top 5 Songs"
      visible={this.state.visible}
      onCancel={this.handleCancel}
      footer={[
            <Button key="back" onClick={this.handleCancel} id='Top 5'>Return</Button>
          ]}
    >
    {this.props.top5Songs? <List
      itemLayout="horizontal"
      dataSource={this.props.top5Songs}
      renderItem={item => (
        <List.Item actions={[<Button size={'small'} shape={"circle"} icon={"play-circle"}
          onClick={ this.props.currentDevice? () =>
            {this.props.playingTrackFromGemItem(this.props.token, item, this.props.currentDevice);
            this.props.startPlayback(this.props.playbackStatus);
            setTimeout(() => this.props.fetchingCurrentSong(this.props.token), 1000)}
        :
      () => message.error('You do not have any active devices')}></Button>,
      <Button size={'small'}
              shape={"circle"}
              onClick={this.props.hiddenGem? () => {this.props.addSongToPile(this.props.user, this.props.hiddenGem, item); message.success(`Song ${item.name} has been added to your pile`);} : () => message.error('Make a Pile First')}> <i class="far fa-gem"></i></Button>]}>
        <List.Item.Meta
        avatar={<Avatar src={item.album.images[0].url} />}
        title={item.artists[0].name}
        description={item.name}
        />
        </List.Item>
      )}
      /> : null}
      </Modal>
      <Modal
        title="Similiar Artist"
        visible={this.state.visibleSimiliar}
        onCancel={(e) => this.handleSimiliarOk(e)}
        footer={[
              <Button key="back" onClick={(e) => this.handleSimiliarOk(e)}>Return</Button>
            ]}
      >
      {this.props.similiarArtists? <List
        itemLayout="horizontal"
        dataSource={this.props.similiarArtists}
        renderItem={artist => (
          <List.Item actions={[<Button size={'small'}
            onClick={() => this.props.fetchArtist(this.props.token, artist.id)}>more</Button>]}>
          <List.Item.Meta
          avatar={<Avatar src={artist.images[0].url} />}
          title={artist.name}
          description={artist.genres[0]}
          />
          </List.Item>
        )}
        /> : null}
    </Modal>
    </Col>
    </Row>
    {this.props.artistAlbums? <Row gutter={16} id={'playListIndex'}justify="center" type='flex'>
      {this.props.artistAlbums.map((album =><Col id={'cardColumn'} key={album.id} span={4}>
      <Card hoverable size="small" title={album.name}
       onClick={() => this.props.fetchingAlbum(album.id, this.props.token)}
       cover={<img alt="example" src={album.images[0].url} />}
       className='playlistCard'
       actions={[<Button size='small' shape='circle' icon='play-circle'
       onClick={this.props.currentDevice? () => {this.props.playingPlaylist(this.props.token, album, this.props.currentDevice);
       this.props.startPlayback(this.props.playbackStatus);
       setTimeout(() => this.props.fetchingCurrentSong(this.props.token), 1000)}
     :
     () => message.error('You do not have any active devices')}>
   </Button>, <Button size='small' shape='circle' icon='eye' name='album' onClick={(e) => {this.props.fetchingAlbum(album.id, this.props.token); this.showModal(e)}}></Button>]}></Card>
      </Col>))}
    </Row> : null}
    <Modal visible={this.state.visibleAlbum}
      onCancel={this.handleAlbumOk}
      footer={[
            <Button key="back" onClick={this.handleAlbumOk}>Return</Button>
          ]}><AlbumContainer/></Modal>
        <Row type='flex' justify='center' align="middle">
          <Button>More</Button>
        </Row>
  </Layout>
  )
  }
}

const mapStateToProps = state => ({
  token: state.token,
  user: state.user,
  hiddenGem: state.hiddenGem,
  artist: state.artist,
  top5Songs: state.top5Songs,
  playbackStatus: state.playbackStatus,
  similiarArtists: state.similiarArtists,
  artistAlbums: state.artistAlbums,
  currentDevice: state.currentDevice
})

const mapDispatchToProps = dispatch => ({
  getTopSongs: (token, artistId) => dispatch(getTopSongs(token, artistId)),
  playingTrackFromGemItem: (token, song, device) => dispatch(playingTrackFromGemItem(token, song, device)),
  startPlayback: (playbackStatus) => dispatch(startPlayback(playbackStatus)),
  fetchingCurrentSong: (token) => dispatch(fetchingCurrentSong(token)),
  getSimiliarArtist: (token, artistId) => dispatch(getSimiliarArtist(token, artistId)),
  fetchArtist: (token, artistId) => dispatch(fetchArtist(token, artistId)),
  addSongToPile: (user, gem, song) => dispatch(addSongToPile(user, gem, song)),
  playingPlaylist: (token, album, device) => dispatch(playingPlaylist(token, album, device)),
  fetchingAlbum: (id, token) => dispatch(fetchingAlbum(id, token))
})

export default connect(mapStateToProps, mapDispatchToProps)(ArtistShowPage)
