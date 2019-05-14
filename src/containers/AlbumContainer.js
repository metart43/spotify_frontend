import React from 'react';
import {connect} from 'react-redux'
import SongsList from './SongsList'
class AlbumContainer extends React.Component {

  render(){
    console.log(this.props.album);
    return(
      <div>
      <SongsList img={this.props.album.images[0].url} songs={this.props.album.tracks}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  album: state.album
})

export default connect(mapStateToProps)(AlbumContainer)
