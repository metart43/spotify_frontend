import React from 'react';
import {connect} from 'react-redux'
import {getTopSongs,
        playingTrackFromGemItem,
        fetchingCurrentSong,
        startPlayback} from '../redux/actions'
import {Card, Row, Modal, Button, List, Avatar} from 'antd'
import Top5SongsModal from './Top5SongsModal'

const {Meta} = Card


class ArtistShowPage extends React.Component {
  constructor(){
    super()
    this.state = {
      visible: false,
      visibleSimiliar: false
  }
}


  showModal = () => {
    setTimeout(() => {
    this.setState({
      visible: true,
    })}, 500)
  }

  showSimiliarModal = () => {
    this.setState({
      visibleSimiliar: true
    })
  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }

  handleCancel = () => {
      this.setState({ visible: false });
    }

  handleSimiliarOk = (e) => {
    this.setState({
      visible: false,
    });
  }

render(){
  return(
    <Row type='flex' justify='center'>
    <Card size='small' cover={<img alt='artistImage' src={this.props.artist.images[1].url} />}
      actions={[<Button onClick={() => {this.props.getTopSongs(this.props.token, this.props.artist.id); this.showModal()} }>Top 5</Button>, <Button onClick={() => this.showSimiliarModal()}> Similiar Artist</Button>]}>
    <Meta
      title={this.props.artist.name}
      description={this.props.artist.genres[0]}
    /></Card>
    <Modal
      title="Top 5 Songs"
      visible={this.state.visible}
      onOk={this.handleOk}
      onCancel={this.handleCancel}
      footer={[
            <Button key="back" onClick={this.handleCancel}>Return</Button>
          ]}
    >
    {this.props.top5Songs? <List
      itemLayout="horizontal"
      dataSource={this.props.top5Songs}
      renderItem={item => (
        <List.Item actions={[<Button size={'small'} shape={"circle"} icon={"play-circle"}
          onClick={() =>
            {this.props.playingTrackFromGemItem(this.props.token, item);
            this.props.startPlayback(this.props.playbackStatus);
            setTimeout(() => this.props.fetchingCurrentSong(this.props.token), 1000)}
        }></Button>]}>
        <List.Item.Meta
        avatar={<Avatar src={item.album.images[0].url} />}
        title={item.artists[0].name}
        description={item.name}
        />
        </List.Item>
      )}
      /> : null}
      </Modal>
      <Modal title="Top 5 Songs"
      visible={this.state.visibleSimiliar}
      onOk={this.handleSimiliarOk}
      onCancel={this.handleCancel}
      >
    </Modal>
    </Row>
  )
  }
}

const mapStateToProps = state => ({
  token: state.token,
  artist: state.artist,
  top5Songs: state.top5Songs,
  playbackStatus: state.playbackStatus
})

const mapDispatchToProps = dispatch => ({
  getTopSongs: (token, artistId) => dispatch(getTopSongs(token, artistId)),
  playingTrackFromGemItem: (token, song) => dispatch(playingTrackFromGemItem(token, song)),
  startPlayback: (playbackStatus) => dispatch(startPlayback(playbackStatus)),
  fetchingCurrentSong: (token) => dispatch(fetchingCurrentSong(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(ArtistShowPage)
