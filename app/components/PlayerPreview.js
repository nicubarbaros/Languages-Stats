import React from 'react';
import PropTypes from 'prop-types';

const PlayerPreview = (props) => (
  <div>
    <div className='column'>
      <img 
        className='avatar'
        src={props.avatar}
        alt={'Avatar for' + props.username}
      />
      <h2 className='username'>@{props.username}</h2>
    </div>
    {props.children}
  </div>
);

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
}

export default PlayerPreview;