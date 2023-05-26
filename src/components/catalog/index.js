import React, { memo, useCallback, useEffect, useState } from 'react';
import List from '../list';
import Item from '../item';
import PaginationControl from '../pagination-control';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useSearchParams } from 'react-router-dom';

function Catalog() {
  const store = useStore();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    let page = +searchParams.get('page') || 1;
    store.actions.catalog.goToPage(page);
  }, [searchParams]);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    currentPage: state.catalog.currentPage,
    totalPages: state.catalog.totalPages,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.actions.basket.addToBasket(_id), [store]),
    // Перейти на страницу
    goToPage: useCallback((page) => setSearchParams(`?page=${page}`), [store]),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket],
    ),
  };

  return (
    <>
      <List list={select.list} renderItem={renders.item} />
      <PaginationControl
        currentPage={select.currentPage}
        totalPages={select.totalPages}
        goTo={callbacks.goToPage}
      />
    </>
  );
}

export default memo(Catalog);
