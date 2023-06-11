import { NavLink } from 'react-router-dom';

function Nav(){
  return (
    <nav>
      <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/produto">Produtos</NavLink></li>
          <li><NavLink to="/vendedor">Vendedores</NavLink></li>
          <li><NavLink to="/venda">Vendas</NavLink></li>
      </ul>
    </nav>
  );
}

export default Nav;