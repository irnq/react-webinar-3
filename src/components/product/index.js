import { memo, useCallback, useEffect } from 'react';
import { cn as bem } from '@bem-react/classname';
import { useParams } from 'react-router-dom';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { numberFormat } from '../../utils';
import './style.css';

function Product() {
  const params = useParams();
  const id = params.id;
  const store = useStore();
  const cn = bem('Product');

  const select = useSelector((state) => ({
    product: state.products.fetched,
  }));

  useEffect(() => {
    if (!select.product || !select.product[id]) {
      store.actions.products.loadProduct(id);
    }
  }, []);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.actions.basket.addToBasket(_id), [store]),
  };

  return (
    select.product[id] && (
      <div className={cn()}>
        <p className={cn('description')}>{select.product[id].description}</p>
        <p className={cn('country')}>
          Страна производитель:{' '}
          <b>
            {select.product[id].madeIn.title} ({select.product[id].madeIn.code})
          </b>
        </p>
        <p className={cn('year')}>
          Год выпуска: <b>{select.product[id].edition}</b>
        </p>
        <p className={cn('price')}>Цена: {numberFormat(+select.product[id].price)} ₽</p>
        <button onClick={() => callbacks.addToBasket(id)}>Добавить</button>
      </div>
    )
  );
}

export default memo(Product);
