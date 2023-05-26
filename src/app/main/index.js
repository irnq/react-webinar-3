import { memo, useCallback, useEffect } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import List from '../../components/list';
import Item from '../../components/item';
import PaginationControl from '../../components/pagination-control';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useSearchParams } from 'react-router-dom';
import { productRoute } from '../../constants/routes';

function Main() {
  const store = useStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const select = useSelector((state) => ({
    list: state.catalog.list,
    currentPage: state.catalog.currentPage,
    totalPages: state.catalog.totalPages,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.actions.basket.addToBasket(_id), [store]),
    // Перейти на страницу
    goToPage: useCallback((page) => setSearchParams(`?page=${page}`), [store]),
  };

  useEffect(() => {
    let page = +searchParams.get('page') || 1;
    store.actions.catalog.goToPage(page);
  }, [searchParams]);

  const renders = {
    item: useCallback(
      (item) => {
        return <Item item={item} onAdd={callbacks.addToBasket} link={productRoute.href} />;
      },
      [callbacks.addToBasket],
    ),
  };

  return (
    <PageLayout>
      <Head title='Магазин' />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List list={select.list} renderItem={renders.item} />
      <PaginationControl
        currentPage={select.currentPage}
        totalPages={select.totalPages}
        goTo={callbacks.goToPage}
      />
    </PageLayout>
  );
}

export default memo(Main);
