import { memo, useCallback } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import LocaleSelect from '../../containers/locale-select';
import PageHeader from '../../components/page-header';
import useSelector from '../../hooks/use-selector';

function Main() {
  const store = useStore();

  useInit(
    () => {
      store.actions.catalog.initParams();
      store.actions.categories.load();
    },
    [],
    true,
  );

  const select = useSelector((state) => ({
    user: state.user.data,
    isAuth: state.user.isAuth,
  }));

  const { t } = useTranslate();

  const callbacks = {
    logout: useCallback(() => store.actions.user.logout(), [store]),
  };

  return (
    <PageLayout>
      <PageHeader
        t={t}
        isAuth={select.isAuth}
        profileLink={`/profile`}
        username={select.user?.profile?.name}
        onLogout={callbacks.logout}
      />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <CatalogFilter />
      <CatalogList />
    </PageLayout>
  );
}

export default memo(Main);
