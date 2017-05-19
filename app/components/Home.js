import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className='home--component'>
    <h1> Battle with your friends on Github </h1>
    <Link className='button' to='/battle'>
      Battle
    </Link>
  </div>
);

export default Home;