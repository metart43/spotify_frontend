import React from 'react';
import {connect} from 'react-redux'
import {deleteHiddenGem} from '../redux/backendActions'
import {togglePileAction} from '../redux/toggleActions'
import {List, Avatar, Button, Typography, Row, Col, message, Popconfirm} from 'antd'
import GemItem from '../components/GemItem'


const {Title, Text} =  Typography


class HiddenGem extends React.Component {

  render(){
    return(
      <React.Fragment>
        <div id={'hiddenGem'}>
        <Row type="flex" justify="space-around" align="middle">
          <Col span={8}></Col>
          <Col span={8}><Title level={3}>{this.props.hiddenGem? this.props.hiddenGem.name : console.log('no name')}
            <Popconfirm title="Wanna scrap your pile?" onConfirm={() => {message.warning('You scraped it!'); this.props.deleteHiddenGem(this.props.hiddenGem)}} onCancel={() => message.success('Keep Geming!')} okText="Scrap" cancelText="Nah">
              <Button id={'deleteButton'} type={'circle'} size={'small'}icon={'delete'} ></Button>
            </Popconfirm>
            </Title>
          </Col>
          <Col span={8}></Col>
          </Row>
          <Row>
            <Col span={8}></Col>
            <Col span={6}>
            <List>
            {this.props.gemSongs.length > 0 ? this.props.gemSongs.map(song => <GemItem key={song.id} song={song}/>) : <Text strong> You do not have any gems:( </Text>}
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
  gemSongs: state.gemSongs,
  togglePile: state.togglePile
})

const mapDispatchToProps = dispatch => ({
  deleteHiddenGem: (hiddenGem) => dispatch(deleteHiddenGem(hiddenGem)),
  togglePileAction: (status) => dispatch(togglePileAction(status))
})

export default connect(mapStateToProps, mapDispatchToProps)(HiddenGem)
