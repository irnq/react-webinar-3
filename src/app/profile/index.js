import { memo, useCallback } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import ProfileCard from '../../components/profile-card';
import LocaleSelect from '../../containers/locale-select';
import PageHeader from '../../components/page-header';
import { Navigate } from 'react-router-dom';

function Profile() {
  const store = useStore();

  const select = useSelector((state) => ({
    user: state.user.data,
    isAuth: state.user.isAuth,
    waiting: state.user.waiting,
  }));

  const { t } = useTranslate();

  const callbacks = {
    // logout
    logout: useCallback(() => store.actions.user.logout(), [store]),
  };

  if (!select.isAuth && !select.waiting) {
    return <Navigate to='/login' replace />;
  }

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
      <Spinner active={select.waiting}>
        <ProfileCard user={select.user} t={t} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
