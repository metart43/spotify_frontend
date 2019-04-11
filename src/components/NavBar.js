import React from 'react';
import {Button, Layout, Menu} from 'antd'
import {createHiddenGem} from '../redux/backendActions'
import {connect} from 'react-redux'

const { Header } = Layout;

const NavBar = (props) => {
  return (
    <React.Fragment>
        <i className="fab fa-spotify"></i>
        {props.token? <strong id={'signedIn'}>"Signed-in"</strong> : <Button type="primary" ><a href='http://localhost:3000/api/v1/login'> Sign In <i className="fas fa-headphones-alt"> </i> </a></Button>}
        <Button onClick={() => props.createHiddenGem(props.user)}>Create Hidden Gem</Button>
      </React.Fragment>
  )
}

const mapStateToProps = state => ({
    token: state.token,
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    createHiddenGem: (props) => dispatch(createHiddenGem(props))
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
