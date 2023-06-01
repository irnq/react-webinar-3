import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Login from './login';
import useStore from '../hooks/use-store';
import Profile from './profile';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const store = useStore();

  const activeModal = useSelector((state) => state.modals.name);

  useEffect(() => {
    store.actions.user.loginByToken();
  }, []);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/profile'} element={<Profile />} />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
