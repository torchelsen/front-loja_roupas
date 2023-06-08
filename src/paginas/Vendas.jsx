import "./Produtos.css";
import axios from "axios";
import { useState, useEffect } from "react";

function Produtos() {
  // Entidades e listas utilizadas na página
  const [produto, setProduto] = useState(null);
  const [produtos, setProdutos] = useState([]);

  // Funções de carregamento de dados do backend
  function getProdutos() {
    axios.get("http://localhost:3005/produto").then((resposta) => {
      setProdutos(resposta.data);
    });
  }

  useEffect(() => {
    getProdutos();
  }, []);

  // Funções para manipulação da entidade principal
  function novoProduto() {
    setProduto({
      descricao: "",
    });
  }

  function alterarProduto(campo, valor, id) {
    setProduto({
      _id: id,
      [campo]: valor,
    });
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

  // Função para geração do formulário
  function getFormulario() {
    return (
      <form>
        <label>Descrição</label>
        <input
          type="text"
          name="descricao"
          value={produto.descricao}
          onChange={(e) => {
            alterarProduto(e.target.name, e.target.value, produto._id);
          }}
        />
        <button
          type="button"
          onClick={() => {
            salvarProduto();
          }}
        >
          Salvar
        </button>
        <button
          type="button"
          onClick={() => {
            setProduto(null);
          }}
        >
          Cancelar
        </button>
      </form>
    );
  }

  // Funções para geração da tabela
  function getLinhaDaTabela(produto) {
    return (
      <tr key={produto._id}>
        <td>{produto._id}</td>
        <td>{produto.descricao}</td>
        <td>
          <button
            type="button"
            onClick={() => {
              if (
                window.confirm(
                  "Confirmar a exclusão do produto " + produto.descricao + "?"
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
    const linhasDaTabela = [];
    for (let i = 0; i < produtos.length; i++) {
      const produto = produtos[i];
      linhasDaTabela[i] = getLinhaDaTabela(produto);
    }
    return linhasDaTabela;
  }

  function getTabela() {
    return (
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
          {getLinhasDaTabela()}
        </tbody>
      </table>
    );
  }

  // Função do conteúdo principal
  function getConteudo() {
    if (produto == null) {
      return (
        <>
          <button
            type="button"
            onClick={() => {
              novoProduto();
            }}
          >
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
      {/* Replace <Aside /> with appropriate component for Produtos */}
      <div className="conteudo">
        <h2>Cadastro de produtos</h2>
        {getConteudo()}
      </div>
    </div>
  );
}

export default Produtos;
