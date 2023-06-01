import { memo, useCallback, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import LocaleSelect from '../../containers/locale-select';
import PageHeader from '../../components/page-header';
import FormLayout from '../../components/form-layout';
import Input from '../../components/input';

function Login() {
  const store = useStore();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const select = useSelector((state) => ({
    user: state.user.data,
    waiting: state.user.waiting,
    isAuth: state.user.isAuth,
    error: state.user.error,
  }));

  const callbacks = {
    onSubmit: (event) => {
      event.preventDefault();
      store.actions.user.login(login, password);
    },

    logout: useCallback(() => store.actions.user.logout(), [store]),
  };

  useEffect(() => {}, [select.isAuth]);

  const { t } = useTranslate();

  if (select.isAuth) {
    return <Navigate to='/' replace />;
  }

  return (
    <PageLayout>
      <Spinner active={select.waiting}>
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
        <FormLayout
          title={t('loginForm.title')}
          labelSubmit={t('loginForm.submit')}
          onSubmit={callbacks.onSubmit}
          error={select.error}
        >
          <Input
            id='login'
            value={login}
            onChange={setLogin}
            placeholder={''}
            label={t('loginForm.login')}
            labelPosition='vertical'
            theme='small'
            required
          />
          <Input
            id='password'
            value={password}
            onChange={setPassword}
            placeholder={''}
            type='password'
            label={t('loginForm.password')}
            labelPosition='vertical'
            theme='small'
            required
          />
        </FormLayout>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Login);
