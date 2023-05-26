import { memo, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import ProductInformation from '../../components/product-information';

function Product() {
  const params = useParams();
  const id = params.id;
  const store = useStore();

  const select = useSelector((state) => ({
    product: state.products.fetched,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  useEffect(() => {
    if (!select.product || !select.product[id]) {
      store.actions.products.loadProduct(id);
    }
  }, [params]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  return (
    <PageLayout>
      <Head title={select.product[id]?.title || ''} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      {select.product[id] && (
        <ProductInformation product={select.product[id]} onAdd={callbacks.addToBasket} />
      )}
    </PageLayout>
  );
}

export default memo(Product);
