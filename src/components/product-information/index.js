import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { numberFormat } from '../../utils';
import './style.css';

function ProductInformation(props) {
  const cn = bem('ProductInformation');

  return (
    <div className={cn()}>
      <p className={cn('description')}>{props.product.description}</p>
      <p className={cn('country')}>
        Страна производитель:{' '}
        <b>
          {props.product.madeIn.title} ({props.product.madeIn.code})
        </b>
      </p>
      <p className={cn('category')}>
        Категория: <b>{props.product.category.title}</b>
      </p>
      <p className={cn('year')}>
        Год выпуска: <b>{props.product.edition}</b>
      </p>
      <p className={cn('price')}>Цена: {numberFormat(props.product.price)} ₽</p>
      <button onClick={() => props.onAdd(props.product._id)}>Добавить</button>
    </div>
  );
}

ProductInformation.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.shape({
      title: PropTypes.string,
    }),
    madeIn: PropTypes.shape({ title: PropTypes.string, code: PropTypes.string }),
    edition: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func.isRequired,
};

ProductInformation.defaultProps = {
  onAdd: () => {},
};

export default memo(ProductInformation);
