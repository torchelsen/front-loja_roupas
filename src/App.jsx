import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './paginas/Home';
import Produtos from './paginas/Produtos';
import Vendas from './paginas/Vendas';
import Vendedores from './paginas/Vendedores';


function App() {
  return (
    <>
      <Routes>
          <Route path='/' element={<Layout><Home/></Layout>} />
          <Route path='/produto' element={<Layout><Produtos/></Layout>} />
          <Route path='/venda' element={<Layout><Vendas/></Layout>} />
          <Route path='/vendedor' element={<Layout><Vendedores/></Layout>} />
      </Routes>     
    </>
  );
}
export default App;
