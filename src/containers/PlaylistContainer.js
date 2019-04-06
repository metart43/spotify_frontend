import React from 'react';
import {connect} from 'react-redux'
import PlaylistShowCard from '../components/PlaylistShowCard'
import SongsList from './SongsList'
import {Card, Row, Col} from 'antd'

class PlaylistContainer extends React.Component {

  render(){
    // debugger
    return(
    <React.Fragment>
      <Row type="flex" justify="space-around" align="middle">
        <Col span={4}></Col>
        <Col span={2}>
          {this.props.playlist ? <PlaylistShowCard/> : null}
          </Col>
          <Col span={10}>
        {this.props.songs ? <SongsList/> : null}
      </Col>
      </Row>
    </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  playlist: state.playlist,
  songs: state.songs
})

export default connect(mapStateToProps)(PlaylistContainer)
