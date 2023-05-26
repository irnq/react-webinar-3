import { useCallback, useContext, useEffect, useState } from 'react';
import Main from './main';
import Basket from './basket';
import useSelector from '../store/use-selector';
import { BrowserRouter } from 'react-router-dom';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);

  return (
    <BrowserRouter>
      <Main />
      {activeModal === 'basket' && <Basket />}
    </BrowserRouter>
  );
}

export default App;
