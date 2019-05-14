import React from 'react';
import {connect} from 'react-redux'
import {Card} from 'antd'
import SongsList from '../containers/SongsList'


const SearchPage = (props) => {
  return(
    <div style={{height: '130vh', background: 'white'}}>
    {props.searchData? <SongsList songs={props.searchData.tracks}/> : null}
    </div>
  )
}

const mapStateToProps = (state) => ({
  searchData: state.searchData
})

export default connect(mapStateToProps)(SearchPage)
