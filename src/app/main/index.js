import { memo, useCallback } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Catalog from '../../components/catalog/';
import Product from '../../components/product';

function Main() {
  const store = useStore();

  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  return (
    <PageLayout>
      <Head title='Магазин' />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <Routes>
        <Route path='/' element={<Catalog />} />
        <Route path='/product/:id' element={<Product />} />
      </Routes>
    </PageLayout>
  );
}

export default memo(Main);
