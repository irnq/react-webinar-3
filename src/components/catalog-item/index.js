import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CatalogItem(props) {
  const callbacks = {
    onItemAction: (e) => {
      e.stopPropagation();
      props.onItemAction(props.item.code);
    },
  };

  const cn = bem('CatalogItem');

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title} </div>
      <div className={cn('price')}>{formatPrice(props.item.price)} ₽</div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onItemAction}>Добавить</button>
      </div>
    </div>
  );
}

CatalogItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  onItemAction: PropTypes.func,
};

CatalogItem.defaultProps = {
  onItemAction: () => {},
};

export default React.memo(CatalogItem);
