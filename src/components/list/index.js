import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function List({ list, children }) {
  const cn = bem('List');
  return (
    <div className={cn()}>
      {list.length > 0 ? (
        list.map((item) => (
          <div key={item.code} className={cn('item')}>
            {React.cloneElement(React.Children.toArray(children)[0], {
              item,
            })}
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
  itemsCount: PropTypes.object,
};

export default React.memo(List);
