import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { numberFormat } from '../../utils';
import './style.css';
import { getLocaleText } from '../../service/localization';

function ProductInformation(props) {
  const cn = bem('ProductInformation');

  const localized = {
    country: getLocaleText('productInformation', 'country', props.locale),
    category: getLocaleText('productInformation', 'category', props.locale),
    year: getLocaleText('productInformation', 'year', props.locale),
    price: getLocaleText('productInformation', 'price', props.locale),
    addButton: getLocaleText('productInformation', 'addButton', props.locale),
  };

  return (
    <div className={cn()}>
      <p className={cn('description')}>{props.product.description}</p>
      <p className={cn('country')}>
        {localized.country}:{' '}
        <b>
          {props.product.madeIn.title} ({props.product.madeIn.code})
        </b>
      </p>
      <p className={cn('category')}>
        {localized.category}: <b>{props.product.category.title}</b>
      </p>
      <p className={cn('year')}>
        {localized.year}: <b>{props.product.edition}</b>
      </p>
      <p className={cn('price')}>
        {localized.price}: {numberFormat(props.product.price)} ₽
      </p>
      <button onClick={() => props.onAdd(props.product._id)}>{localized.addButton}</button>
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
  locale: PropTypes.string,
};

ProductInformation.defaultProps = {
  onAdd: () => {},
};

export default memo(ProductInformation);
