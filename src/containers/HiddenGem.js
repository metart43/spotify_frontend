import React from 'react';
import {connect} from 'react-redux'
import {deleteHiddenGem} from '../redux/backendActions'
import {searchAction} from '../redux/actions'
import {togglePileAction} from '../redux/toggleActions'
import {List, Avatar, Button, Typography, Row, Col, message, Popconfirm, Icon, Input, Modal} from 'antd'
import GemItem from '../components/GemItem'


const {Title, Text} =  Typography
const Search = Input.Search


class HiddenGem extends React.Component {


  render(){
    return(
      <React.Fragment>
        <div id={'hiddenGem'}>
        <Row type="flex" justify="space-around" align="middle">
          <Col span={8}></Col>
          <Col span={4}><Title level={3}>{this.props.hiddenGem? this.props.hiddenGem.name : console.log('no name')}
            <Popconfirm title="Wanna scrap your pile?" onConfirm={() => {message.warning('You scraped it!'); this.props.deleteHiddenGem(this.props.hiddenGem)}} onCancel={() => message.success('Keep Geming!')} okText="Scrap" cancelText="Nah">
              <Button id={'deleteButton'} type={'circle'} size={'small'}icon={'delete'} ></Button>
            </Popconfirm>
            </Title>
          </Col>
          <Col span={12}>
            <Search
              placeholder="Find a song"
              onChange={event => this.props.searchAction(event.target.value)}
              style={{ width: 150 }}
              />
          </Col>
          </Row>
          <Row>
            <Col span={8}></Col>
            <Col span={6}>
            <List>
            {this.props.gemSongs.length > 0 ? this.props.gemSongs.map(song => <GemItem key={song.id} song={song}/>) : <Text secondary> Press on a Playlist Card and go dig those <Text mark>Gems</Text>  </Text>}
            </List>
            </Col>
            <Col span={8}></Col>
          </Row>
        </div>
      </React.Fragment>
    )
  }
}



const mapStateToProps = state => ({
  user: state.user,
  hiddenGem: state.hiddenGem,
  gemSongs: state.gemSongs.filter(song => (
      song.name.toLowerCase().includes(state.searchText.toLowerCase()) ||
      song.artist
        .toLowerCase()
        .includes(state.searchText.toLowerCase()))),
  togglePile: state.togglePile,
  searchText: state.searchText
})

const mapDispatchToProps = dispatch => ({
  deleteHiddenGem: (hiddenGem) => dispatch(deleteHiddenGem(hiddenGem)),
  togglePileAction: (status) => dispatch(togglePileAction(status)),
  searchAction: (text) => dispatch(searchAction(text))
})

export default connect(mapStateToProps, mapDispatchToProps)(HiddenGem)
