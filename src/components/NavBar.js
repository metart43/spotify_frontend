import React from 'react';
import {Button, Layout, Menu, Typography} from 'antd'
import {createHiddenGem} from '../redux/backendActions'
import {togglePileAction} from '../redux/toggleActions'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

const { Header } = Layout;
const { Title, Text } = Typography

const NavBar = (props) => {
  return (
    <React.Fragment>
      <Menu mode="horizontal">
      <Menu.Item>
        <NavLink to='/playlists'>
      <Title level={2} id={'title'}>Hidden Gem</Title>
      </NavLink>
        </Menu.Item>
      <Menu.Item style={{float: "right"}}>  {props.user? <Text type="secondary"> <strong> {props.user.display_name} </strong></Text> : <Button type="primary" ><a href='http://localhost:3000/api/v1/login'> Sign In <i className="fas fa-headphones-alt"> </i> </a></Button>}
      </Menu.Item>
      <Menu.Item style={{float: "right"}}>
        {props.hiddenGem ? <Button onClick={() => {props.togglePileAction(props.pileToggleStatus)}}> {props.pileToggleStatus ? 'Hide': 'Show'}</Button> :
        <Button onClick={() => {props.createHiddenGem(props.user)}}>Make A Pile</Button>}
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
    createHiddenGem: (props) => dispatch(createHiddenGem(props)),
    togglePileAction: (status) => dispatch(togglePileAction(status))
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
