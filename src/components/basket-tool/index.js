import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import './style.css';
import Navigation from '../navigation';
import { mainRoute } from '../../constants/routes';
import { getLocaleText } from '../../service/localization';

const navList = [mainRoute];

function BasketTool({ sum, amount, onOpen, locale }) {
  const cn = bem('BasketTool');

  const localized = {
    inCart: getLocaleText('basketTool', 'inCart', locale),
    amount: getLocaleText('basketTool', 'product', locale, { plural: amount }),
    empty: getLocaleText('basketTool', 'empty', locale),
    openCart: getLocaleText('basketTool', 'openCart', locale),
  };
  return (
    <div className={cn()}>
      <Navigation linkList={navList} locale={locale} />
      <span className={cn('label')}>{localized.inCart}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${localized.amount}
           / ${numberFormat(sum)} ₽`
          : localized.empty}
      </span>
      <button onClick={onOpen}>{localized.openCart}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  locale: PropTypes.string,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
  locale: 'ru',
};

export default memo(BasketTool);
