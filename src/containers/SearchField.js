import React from 'react';
import {connect} from 'react-redux'
import {searchFetch} from '../redux/actions'
import {Input} from 'antd'
import { withRouter } from "react-router-dom";

const Search = Input.Search;

class SearchField extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      redirect: false
    }
  }

  redirectFunc = (value) => {
    this.props.searchFetch(value, this.props.token, this.props.history)
  }


  render(){
    return(
    <Search
      placeholder="track or artist"
      onSearch={(value) => this.redirectFunc(value)}
      style={{ width: 150 }}
      />
    )
  }
}

const mapStateToProps = state => ({
  token: state.token
})

const mapDispatchToProps = dispatch => ({
  searchFetch: (text, token, history) => dispatch(searchFetch(text, token, history))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchField))
