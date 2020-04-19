import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import PropTypes from 'prop-types'; 

export default function Loader(props) {
  return (
    <span>
      <ClipLoader 
        size={props.size}
        color={props.color}
      />    
    </span>
  )
}

Loader.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string
}

Loader.defaultProps = {
  size: 12,
  color: 'black'
}