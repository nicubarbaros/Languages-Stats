import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import queryString from 'query-string';

import PlayerPreview from './PlayerPreview';
import { battle } from '../utils/api';

const Profile = (props) => {
  var info = props.info;

  return (
    <PlayerPreview 
      avatar={info.avatar_url}
      username={info.login}>
      <ul className='space--list-items'>
        {info.name && <li>{info.name}</li>}
        {info.location && <li>{info.location}</li>}
        {info.company && <li>{info.company}</li>}
        <li>Followers: {info.followers}</li>
        <li>Following: {info.following}</li>
        <li>Public Repos: {info.public_repos}</li>
        {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
       </ul>
    </PlayerPreview>
  );
}

Profile.propTypes = {
  info: PropTypes.object.isRequired
}

const Player = (props) => (
  <div>
    <h1 className='header'> {props.label}</h1>
    <h3 style={{textAlign: 'center'}}>Score: {props.score}</h3>
    <Profile info={props.profile}/>
  </div>
);

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired
} 

class Results extends Component {
  constructor(props){
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }

  componentDidMount () {
    var players = queryString.parse(this.props.location.search);
    
    battle([
      players.playerOneName,
      players.playerTwoName
    ]).then(function (players) {
      if(players == null) {
        return this.setState(function () {
          return {
            error: 'Check the both users Exists on Github',
            loading: false
          }
        });
      }

      this.setState(function () {
        return {
          winner: players[0],
          loser: players[1],
          error: null,
          loading: false
        }
      });
    }.bind(this));
  }

  render() {
    var error = this.state.error;
    var winner = this.state.winner;
    var loser = this.state.loser;
    var loading = this.state.loading;
    if (loading === true) {
      return <p> loading </p>
    }

    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to="/battle"> Reset </Link>
        </div>
      )
    }

    return (
      <div className='row'>
        <Player
          label='Winner'
          score={winner.score}
          profile={winner.profile}
        />

        <Player
          label='Loser'
          score={34}
          profile={loser.profile}
        />
      </div>
    )
  }
}

export default Results;