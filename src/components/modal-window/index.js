import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ModalWindow({ children, closable, onClose, isOpen }) {
  const cn = bem('ModalWindow');

  const handleClick = (event) => {
    if (closable && event.target.matches('.ModalWindow')) {
      onClose();
    }
  };

  return (
    <div className={cn() + (isOpen ? '' : ' hidden')} onClick={handleClick}>
      <div className={cn('center')}>{children}</div>
    </div>
  );
}

ModalWindow.propTypes = {
  children: PropTypes.node,
  closable: PropTypes.bool,
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
};

ModalWindow.defaultProps = {
  closable: true,
  onClose: () => {},
  isOpen: false,
};

export default React.memo(ModalWindow);
