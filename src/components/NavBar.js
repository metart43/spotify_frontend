import React from 'react';
import {Button, Layout, Menu, Breadcrumb, Icon } from 'antd'

const { Header, Content, Footer } = Layout;

const NavBar = () => {
  return (
      <Layout>
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="logo" />
      <Menu
        theme="light"
        mode="horizontal"
        style={{ lineHeight: '64px' }}>
        <Menu.Item key="1">Spotify<i class="fab fa-spotify"></i></Menu.Item>
        <Menu.Item ><Button type="primary" ghost ><a href='http://localhost:3000/api/v1/login'> Sign In <i class="fas fa-headphones-alt"> </i> </a></Button></Menu.Item>
    </Menu>
  </Header>

      </Layout>
  )
}

export default NavBar
