import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function List({ list, onItemAction, itemActionType, itemsCount }) {
  const cn = bem('List');
  return (
    <div className={cn()}>
      {list.length > 0 ? (
        list.map((item) => (
          <div key={item.code} className={cn('item')}>
            <Item
              item={item}
              onItemAction={onItemAction}
              itemActionType={itemActionType}
              itemCount={itemsCount ? itemsCount[item.code] : null}
            />
          </div>
        ))
      ) : (
        <p className={cn('empty')}>Список пуст.</p>
      )}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  onItemAction: PropTypes.func,
  itemActionType: PropTypes.oneOf(['remove', 'add']),
  itemsCount: PropTypes.object,
};

List.defaultProps = {
  onItemAction: () => {},
  itemActionType: 'add',
};

export default React.memo(List);
