import React from 'react';
import {List} from 'antd'
import {Button, Avatar, message} from 'antd'
import {connect} from 'react-redux'
import {playingTrack,
  fetchingCurrentSong,
  startPlayback,
  startPlayerActivity,
  fetchArtist} from '../redux/actions'
import { NavLink } from 'react-router-dom';
import {addSongToPile} from '../redux/backendActions'

const SongItem = (props) => {
  debugger
  return(
    <React.Fragment>
      <List.Item actions={[<Button size={'small'} shape={"circle"} icon={"play-circle"}
          onClick={props.currentDevice? () =>
            {props.playingTrack(props.token, props.song, props.currentDevice) ;
            props.startPlayback(props.playbackStatus);
            setTimeout(() => props.fetchingCurrentSong(props.token), 1000)}
          :
        () => message.error('You do not have any active devices')
        }></Button>,
        <Button size={'small'}
                shape={"circle"}
                onClick={props.hiddenGem? () => {props.addSongToPile(props.user, props.hiddenGem, props.song.track); message.success(`Song ${props.song.track.name} by has been added to your pile`);} : () => message.error('Make a Pile First')}>
                <i class="far fa-gem"></i>
        </Button>,
                <NavLink to={'/artist'}>
        <Button  size={'small'} onClick={() => props.fetchArtist(props.token, props.song.track.artists[0].id)}>more
        </Button>
                </NavLink>]}>
        <List.Item.Meta
        avatar={props.img === undefined ? <Avatar src={props.song.track.album.images[0].url} /> : <Avatar src={props.img} />}
        title={props.song.track.artists[0].name}
        description={props.song.track.name}
        />
      </List.Item>
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  token: state.token,
  playbackStatus: state.playbackStatus,
  playerStatus: state.playerStatus,
  hiddenGem: state.hiddenGem,
  user: state.user,
  currentDevice: state.currentDevice
})

const mapDispatchToProps = dispatch => ({

  playingTrack: (token, song, device) => dispatch(playingTrack(token, song, device)),
  startPlayback: (playbackStatus) => dispatch(startPlayback(playbackStatus)),
  startPlayerActivity: (playerStatus) => dispatch(startPlayerActivity(playerStatus)),
  fetchingCurrentSong: (token) => dispatch(fetchingCurrentSong(token)),
  addSongToPile: (user, gem, song) => dispatch(addSongToPile(user, gem, song)),
  fetchArtist: (token, artistId) => dispatch(fetchArtist(token, artistId))

})

export default connect(mapStateToProps, mapDispatchToProps)(SongItem)
