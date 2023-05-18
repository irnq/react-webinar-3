import React from 'react';
import PropTypes from 'prop-types';

export default function Spacer(props) {
  const spacerStyle = {
    height: props.height ? `${props.height}px` : '',
    width: props.width ? `${props.width}px` : '',
  };

  return <div style={spacerStyle}></div>;
}

Spacer.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};
