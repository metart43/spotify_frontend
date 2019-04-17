import React from 'react';
import {connect} from 'react-redux'
import {deleteHiddenGem} from '../redux/backendActions'
import {togglePileAction} from '../redux/toggleActions'
import {List, Avatar, Button, Typography, Row, Col, message, Popconfirm} from 'antd'
import GemItem from '../components/GemItem'


const {Title, Text} =  Typography


class HiddenGem extends React.Component {
  confirm(e) {
    console.log(e);
    message.success('Click on Yes');
  }

  cancel(e) {
    console.log(e);
    message.error('Click on No');
  }
  render(){
    return(
      <React.Fragment>
        <div id={'hiddenGem'}>
        <Row type="flex" justify="space-around" align="middle">
          <Col span={10}></Col>
          <Col span={4}><Title level={3}>{this.props.hiddenGem? this.props.hiddenGem.name : console.log('no name')}
            <Popconfirm title="Are you sure delete this task?" onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
              <Button id={'deleteButton'} type={'circle'} size={'small'}icon={'delete'} onClick={() => {this.props.deleteHiddenGem(this.props.hiddenGem)}}></Button>
            </Popconfirm>
            </Title>
          </Col>
          <Col span={8}></Col>
          <Col span={4}></Col>
          <Col span={12}><List>
            {this.props.gemSongs.length > 0 ? this.props.gemSongs.map(song => <GemItem key={song.id} song={song}/>) : <Text strong> You do not have any gems:( </Text>}
          </List>
          </Col>
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
