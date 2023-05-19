import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CartItem(props) {
  const callbacks = {
    onItemAction: (e) => {
      e.stopPropagation();
      props.onItemAction(props.item.code);
    },
  };

  const cn = bem('CartItem');

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title} </div>
      <div className={cn('price')}>{formatPrice(props.item.price)} ₽</div>
      <div className={cn('count')}>{props.item.countInCart} шт</div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onItemAction}>Удалить</button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  onItemAction: PropTypes.func,
};

CartItem.defaultProps = {
  onItemAction: () => {},
};

export default React.memo(CartItem);
