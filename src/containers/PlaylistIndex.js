import React from 'react';
import PlaylistCard from '../components/PlaylistCard'
import {connect} from 'react-redux'
import {fetchingPlaylist} from '../redux/actions'
import {Card, Row, Col} from 'antd'


class PlaylistIndex extends React.Component {

  render(){
    return (
      <Row type="flex" justify="space-around" align="middle">
        {this.props.playlists.map((pl =><Col span={4}> <Card className='playlistCard'><PlaylistCard key={pl.id} pl={pl}/></Card></Col>))}
      </Row>
  )
  }
}

const mapStateToProps = state => ({
  token: state.token,
  playlists: state.playlists
})

const mapDispatchToProps = dispatch => {
  return {
    fetchingPlaylist: (token) => dispatch(fetchingPlaylist(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistIndex)
