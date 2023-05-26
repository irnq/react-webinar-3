import { memo, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import ProductInformation from '../../components/product-information';
import { langOptions } from '../../service/localization';
import Toggler from '../../components/toggler';

function Product() {
  const params = useParams();
  const id = params.id;
  const store = useStore();

  const select = useSelector((state) => ({
    product: state.products.fetched,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.localization.lang,
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
    // Переключение языка
    setLang: useCallback((option) => store.actions.localization.setLang(option), [store]),
  };

  return (
    <PageLayout>
      <Head title={select.product[id]?.title || ''}>
        <Toggler defaultValue={select.lang} options={langOptions} onChange={callbacks.setLang} />
      </Head>
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        locale={select.lang}
      />
      {select.product[id] && (
        <ProductInformation
          product={select.product[id]}
          onAdd={callbacks.addToBasket}
          locale={select.lang}
        />
      )}
    </PageLayout>
  );
}

export default memo(Product);
