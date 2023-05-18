import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Item(props) {
  const callbacks = {
    onItemAction: (e) => {
      e.stopPropagation();
      props.onItemAction(props.item.code);
    },
  };

  const cn = bem('Item');

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title} </div>
      <div className={cn('price')}>{formatPrice(props.item.price)} ₽</div>
      {props.itemCount ? <div className={cn('count')}>{props.itemCount} шт</div> : false}
      <div className={cn('actions')}>
        <button onClick={callbacks.onItemAction}>
          {props.itemActionType === 'remove' ? 'Удалить' : 'Добавить'}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  onItemAction: PropTypes.func,
  itemActionType: PropTypes.oneOf(['remove', 'add']),
  itemCount: PropTypes.number,
};

Item.defaultProps = {
  onItemAction: () => {},
  itemActionType: 'add',
};

export default React.memo(Item);
