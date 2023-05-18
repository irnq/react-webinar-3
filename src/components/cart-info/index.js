import React from 'react';
import PropTypes from 'prop-types';
import { plural, formatPrice } from '../../utils';
import './style.css';

const PRODUCT_PLURAL = {
  one: 'товар',
  few: 'товара',
  many: 'товаров',
};

function CartInfo({ count, sum }) {
  return (
    <div className='CartInfo'>
      <p>
        В корзине:{' '}
        <b>
          {count > 0
            ? `${count} ${plural(count, PRODUCT_PLURAL)} / ${formatPrice(sum)} ₽`
            : 'пусто'}
        </b>
      </p>
    </div>
  );
}

CartInfo.propTypes = {
  count: PropTypes.number,
  sum: PropTypes.number,
};

export default React.memo(CartInfo);
