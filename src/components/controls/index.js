import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Controls({ children }) {
  return <div className='Controls'>{children}</div>;
}

Controls.propTypes = {
  children: PropTypes.node,
};

Controls.defaultProps = {
  onAdd: () => {},
};

export default memo(Controls);
