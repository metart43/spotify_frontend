import React from 'react';
import {Button, Layout, Menu, Typography, message, Dropdown, Icon} from 'antd'
import {logoutUser} from '../redux/actions'
import {createHiddenGem} from '../redux/backendActions'
import {togglePileAction} from '../redux/toggleActions'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

const { Header } = Layout;
const { Title, Text } = Typography

function confirm(e) {
  console.log(e);
  message.success('Click on Yes');
}

function cancel(e) {
  console.log(e);
  message.error('Click on No');
}


const NavBar = (props) => {
  return (
    <React.Fragment>
      <Menu mode="horizontal">
      <Menu.Item>
        <NavLink to='/playlists'>
      <Title level={2} id={'title'}>Hidden Gem <i class="fas fa-gem"></i></Title>
      </NavLink>
        </Menu.Item>
      <Menu.Item style={{float: "right"}}>  {props.user?
        <Dropdown overlay={<Menu>
    <Menu.Item key="0">
      <NavLink onClick={() => this.props.logoutUser()}to='/'>Log out</NavLink>
    </Menu.Item>
  </Menu>} trigger={['click']}>
      <Text type="secondary">
      <strong>
      {props.user.display_name}
    </strong> <Icon type="down" />
      </Text>
  </Dropdown>
 : <Button type="primary" ><a href='http://localhost:3000/api/v1/login'> Sign In <i className="fas fa-headphones-alt"> </i> </a></Button>}
      </Menu.Item>
      <Menu.Item style={{float: "right"}}>
        {props.hiddenGem ? <Button onClick={() => {props.togglePileAction(props.pileToggleStatus)}}> {props.pileToggleStatus ? 'Hide': 'Show'}</Button> :
        props.user ? <Button onClick={() => {props.createHiddenGem(props.user, props.pileToggleStatus); message.success("You have created a Gem's pile. Go ahead and add your gems!")}}>Make A Pile</Button> : null}
        </Menu.Item>
        </Menu>
      </React.Fragment>
  )
}

const mapStateToProps = state => ({
    token: state.token,
    user: state.user,
    hiddenGem: state.hiddenGem,
    pileToggleStatus: state.pileToggleStatus

})

const mapDispatchToProps = dispatch => ({
    createHiddenGem: (props, status) => dispatch(createHiddenGem(props, status)),
    togglePileAction: (status) => dispatch(togglePileAction(status)),
    logoutUser: () => dispatch(logoutUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
