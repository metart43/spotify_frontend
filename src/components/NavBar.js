import React from 'react';
import {Button, Layout, Menu} from 'antd'

const { Header } = Layout;

const NavBar = () => {
  return (
    <React.Fragment>
        <i className="fab fa-spotify"></i>
        <Button type="primary" ><a href='http://localhost:3000/api/v1/login'> Sign In <i className="fas fa-headphones-alt"> </i> </a></Button>
      </React.Fragment>
  )
}

export default NavBar
