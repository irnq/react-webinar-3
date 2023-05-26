import React from 'react';
import Main from './main';
import Product from './product';
import Basket from './basket';
import useSelector from '../store/use-selector';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/product/:id' element={<Product />} />
      </Routes>
      {activeModal === 'basket' && <Basket />}
    </BrowserRouter>
  );
}

export default App;
