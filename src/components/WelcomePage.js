import React from 'react';
import {connect} from 'react-redux'
import {Layout, Typography, Row} from 'antd'

const {Text} = Typography

const WelcomePage = (props) => {
  return(
      <Layout style={{height: '100vh', background: 'white'}}>
    {props.user?  <Row>
      <Text>Hey {props.user.name}! Go and have fun with my app!</Text>
      </Row> :

      `To use this application you must be signed in with a valid Spotify Account`}
    </Layout>
  )
}

const mapStateToProps = state => ({
  user: state.user
})


export default connect(mapStateToProps)(WelcomePage)
