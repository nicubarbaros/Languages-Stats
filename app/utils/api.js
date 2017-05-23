"use strict";

import axios from 'axios';

const getProfile = function (username){
  const requestURI = 'https://api.github.com/users/' + username;
  return axios.get(requestURI)
    .then(user => user.data);
}

const getRepos = function (username){
  const requestURI = 'https://api.github.com/users/' + username + '/repos' + '?&per_page=100';
  return axios.get(requestURI);
}

const getStarCount = function (repos) {
  return repos.data.reduce((count, repo) => count + repo.stargazers_count, 0);
}

const calculateScore = function (profile, repos) {
  let followers = profile.followers;
  let totalStars = getStarCount(repos);
  return (followers * 2) + totalStars;
}

const handleError = function (error) {
  console.warn(error);
  return null;
}

const getUserData = function (player) {
  return axios.all([
    getProfile(player),
    getRepos(player)
  ]).then(function (data) {
    var profile = data[0];
    var repos = data[1];

    return {
      profile: profile,
      score: calculateScore(profile, repos)
    }
  });
}

const sortPlayers = function (players) {
  return players.sort((a, b) => b.score - a.score);
}

async function fetchPopularRepos (language) {
  const encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');
  const response = await axios.get(encodedURI);
  return response.data.items;
}

function battle (players) {
  return axios.all(players.map(getUserData))
    .then(sortPlayers)
    .catch(handleError);
}

export {fetchPopularRepos, battle};