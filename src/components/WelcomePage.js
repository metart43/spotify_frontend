import React from 'react';
import {connect} from 'react-redux'
import {Layout, Typography, Row} from 'antd'
import {NavLink} from 'react-router-dom'

const {Text, Title} = Typography

const WelcomePage = (props) => {
  console.log(props.user);
  return(
      <Layout style={{height: '100vh', background: 'white'}}>
    {props.user?
      <Row type='flex' justify='center' align='middle' id={'welcomePage'}>
      <Text>Hey <Text strong>{props.user.display_name}</Text>!
        <br/>
        Welcome to my Hidden Gem Finder!
        <br/>
        This application will help you to discover brand new music and listen to new unknown bands.
        <br/>
        All playlist are currated by me and and some of my other friends who are musicians.
        <br/>
        Feel free to make your own <Text mark>Pile</Text> and store all the Hidden Gems that you find here!
        <br/>
        <NavLink to='/playlists'>Take me there!</NavLink>
      </Text>
      </Row> :
      <Row type='flex' justify='center' align='middle' id={'welcomePage'}>
        Please, press on Sign In Button to start using the application.
        <br/>
        Keep in mind that you will need authorize my application to perform certain actions.
    </Row>
     }
    </Layout>
  )
}

const mapStateToProps = state => ({
  user: state.user
})


export default connect(mapStateToProps)(WelcomePage)
