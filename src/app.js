import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import ModalWindow from './components/modal-window';
import Spacer from './components/spacer';
import CartInfo from './components/cart-info';
import CartFooter from './components/cart-footer';
import Scrollable from './components/scrollable';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [isCartOpen, setCartOpen] = useState(false);
  const cartSum = store.getState().cartSum;
  const itemsCountInCart = store.getState().itemsCountInCart;
  const cart = store.getState().cart;
  const list = store.getState().list;

  const callbacks = {
    onDeleteItemFromCart: useCallback(
      (code) => {
        store.deleteItemFromCart(code);
      },
      [store],
    ),

    onAddItemToCart: useCallback(
      (code) => {
        store.addItemToCart(code);
      },
      [store],
    ),

    onOpenCart: () => {
      setCartOpen(true);
    },

    onCloseCart: () => {
      setCartOpen(false);
    },
  };

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Controls>
        <CartInfo count={cart.length} sum={cartSum} />
        <button onClick={callbacks.onOpenCart}>Перейти</button>
      </Controls>
      <List list={list} onItemAction={callbacks.onAddItemToCart} itemActionType='add' />
      <ModalWindow isOpen={isCartOpen} cart={cart} closable onClose={callbacks.onCloseCart}>
        <Head title='Корзина'>
          <button onClick={callbacks.onCloseCart}>Закрыть</button>
        </Head>
        {cart.length > 0 ? (
          <Controls>
            <Spacer height={28} />
          </Controls>
        ) : (
          false
        )}
        <Scrollable maxHeight={189}>
          <List
            list={cart}
            itemsCount={itemsCountInCart}
            onItemAction={callbacks.onDeleteItemFromCart}
            itemActionType='remove'
          />
        </Scrollable>
        {cart.length > 0 ? <CartFooter sum={cartSum} /> : false}
      </ModalWindow>
    </PageLayout>
  );
}

export default App;
