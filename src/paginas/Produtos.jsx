import axios from "axios";
import { useState, useEffect } from "react";

function Produtos() {
  const [produto, setProduto] = useState(null);
  const [produtos, setProdutos] = useState([]);

  function getProdutos() {
    axios.get("http://localhost:3005/produto").then((resposta) => {
      setProdutos(resposta.data);
    });
  }

  useEffect(() => {
    getProdutos();
  }, []);

  function novoProduto() {
    setProduto({
      codigo: 0,
      qtdEstoque: 0,
      valor: 0,
      nomeProduto: ""
    });
  }

  function alterarProduto(campo, valor) {
    setProduto((prevProduto) => ({
      ...prevProduto,
      [campo]: valor
    }));
  }

  function excluirProduto(id) {
    axios.delete("http://localhost:3005/produto/" + id).then(() => {
      reiniciarEstadoDosObjetos();
    });
  }

  function salvarProduto() {
    if (produto._id) {
      axios.put("http://localhost:3005/produto/" + produto._id, produto).then(() => {
        reiniciarEstadoDosObjetos();
      });
    } else {
      axios.post("http://localhost:3005/produto", produto).then(() => {
        reiniciarEstadoDosObjetos();
      });
    }
  }

  function reiniciarEstadoDosObjetos() {
    setProduto(null);
    getProdutos();
  }

  function getFormulario() {
    return (
      <form>
        <label>Código</label>
        <input
          type="number"
          name="codigo"
          value={produto.codigo}
          onChange={(e) => {
            alterarProduto(e.target.name, parseInt(e.target.value));
          }}
        />
        <label>Quantidade em Estoque</label>
        <input
          type="number"
          name="qtdEstoque"
          value={produto.qtdEstoque}
          onChange={(e) => {
            alterarProduto(e.target.name, parseInt(e.target.value));
          }}
        />
        <label>Valor</label>
        <input
          type="number"
          name="valor"
          value={produto.valor}
          onChange={(e) => {
            alterarProduto(e.target.name, parseFloat(e.target.value));
          }}
        />
        <label>Nome do Produto</label>
        <input
          type="text"
          name="nomeProduto"
          value={produto.nomeProduto}
          onChange={(e) => {
            alterarProduto(e.target.name, e.target.value);
          }}
        />
        <button type="button" onClick={salvarProduto}>
          Salvar
        </button>
        <button type="button" onClick={() => setProduto(null)}>
          Cancelar
        </button>
      </form>
    );
  }

  function getLinhaDaTabela(produto) {
    return (
      <tr key={produto._id}>
        <td>{produto.codigo}</td>
        <td>{produto.qtdEstoque}</td>
        <td>{produto.valor}</td>
        <td>{produto.nomeProduto}</td>
        <td>
          <button
            type="button"
            onClick={() => {
              if (
                window.confirm(
                  "Confirmar a exclusão do produto " + produto.nomeProduto + "?"
                )
              ) {
                excluirProduto(produto._id);
              }
            }}
          >
            Excluir
          </button>
          <button
            type="button"
            onClick={() => {
              setProduto(produto);
            }}
          >
            Editar
          </button>
        </td>
      </tr>
    );
  }

  function getLinhasDaTabela() {
    return produtos.map((produto) => getLinhaDaTabela(produto));
  }

  function getTabela() {
    return (
      <table>
        <tbody>
          <tr>
            <th>Código</th>
            <th>Quantidade em Estoque</th>
            <th>Valor</th>
            <th>Nome do Produto</th>
            <th>Ações</th>
          </tr>
          {getLinhasDaTabela()}
        </tbody>
      </table>
    );
  }

  function getConteudo() {
    if (produto == null) {
      return (
        <>
          <button type="button" onClick={novoProduto}>
            Novo produto
          </button>
          {getTabela()}
        </>
      );
    } else {
      return getFormulario();
    }
  }

  return (
    <div className="produtos">
      <div className="conteudo">
        <h2>Cadastro de produtos</h2>
        {getConteudo()}
      </div>
    </div>
  );
}

export default Produtos;
