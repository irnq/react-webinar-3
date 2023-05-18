import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Scrollable({ children, maxHeight }) {
  return (
    <div className='Scrollable' style={{ maxHeight: maxHeight ? `${maxHeight}px` : '' }}>
      {children}
    </div>
  );
}

Scrollable.propTypes = {
  sum: PropTypes.node,
  maxHeight: PropTypes.number,
};

export default React.memo(Scrollable);
