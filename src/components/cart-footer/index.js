import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../../utils';
import './style.css';

function CartFooter({ sum }) {
  return (
    <div className='CartFooter'>
      <b>Итого</b>
      <b>{formatPrice(sum)} ₽</b>
    </div>
  );
}

CartFooter.propTypes = {
  sum: PropTypes.number,
};

export default React.memo(CartFooter);
