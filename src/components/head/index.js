import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Head({ title, children }) {
  return (
    <div className='Head'>
      <h1>{title}</h1>
      {children && <div className='Head-control'>{children}</div>}
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
};

export default memo(Head);
