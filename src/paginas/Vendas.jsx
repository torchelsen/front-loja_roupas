import axios from "axios";
import { useState, useEffect } from "react";

function Vendas() {
  const [venda, setVenda] = useState(null);
  const [vendas, setVendas] = useState([]);

  function getVendas() {
    axios.get("http://localhost:3005/venda").then((resposta) => {
      setVendas(resposta.data);
    });
  }

  useEffect(() => {
    getVendas();
  }, []);

  function novaVenda() {
    setVenda({
      codigo: 0,
      dataVenda: null,
      valorTotal: 0
    });
  }

  function alterarVenda(campo, valor) {
    setVenda((prevVenda) => ({
      ...prevVenda,
      [campo]: valor
    }));
  }

  function excluirVenda(id) {
    axios.delete("http://localhost:3005/venda/" + id).then(() => {
      reiniciarEstadoDosObjetos();
    });
  }

  function salvarVenda() {
    if (venda._id) {
      axios.put("http://localhost:3005/venda/" + venda._id, venda).then(() => {
        reiniciarEstadoDosObjetos();
      });
    } else {
      axios.post("http://localhost:3005/venda", venda).then(() => {
        reiniciarEstadoDosObjetos();
      });
    }
  }

  function reiniciarEstadoDosObjetos() {
    setVenda(null);
    getVendas();
  }

  function getFormulario() {
    return (
      <form>
        <label>Código</label>
        <input
          type="number"
          name="codigo"
          value={venda.codigo}
          onChange={(e) => {
            alterarVenda(e.target.name, parseInt(e.target.value));
          }}
        />
        <label>Data da Venda</label>
        <input
          type="date"
          name="dataVenda"
          value={venda.dataVenda}
          onChange={(e) => {
            alterarVenda(e.target.name, e.target.value);
          }}
        />
        <label>Valor Total</label>
        <input
          type="number"
          name="valorTotal"
          value={venda.valorTotal}
          onChange={(e) => {
            alterarVenda(e.target.name, parseFloat(e.target.value));
          }}
        />
        <button type="button" onClick={salvarVenda}>
          Salvar
        </button>
        <button type="button" onClick={() => setVenda(null)}>
          Cancelar
        </button>
      </form>
    );
  }

  function getLinhaDaTabela(venda) {
    return (
      <tr key={venda._id}>
        <td>{venda.codigo}</td>
        <td>{venda.dataVenda}</td>
        <td>{venda.valorTotal}</td>
        <td>
          <button
            type="button"
            onClick={() => {
              if (
                window.confirm(
                  "Confirmar a exclusão da venda com código " + venda.codigo + "?"
                )
              ) {
                excluirVenda(venda._id);
              }
            }}
          >
            Excluir
          </button>
          <button
            type="button"
            onClick={() => {
              setVenda(venda);
            }}
          >
            Editar
          </button>
        </td>
      </tr>
    );
  }

  function getLinhasDaTabela() {
    return vendas.map((venda) => getLinhaDaTabela(venda));
  }

  function getTabela() {
    return (
      <table>
        <tbody>
          <tr>
            <th>Código</th>
            <th>Data da Venda</th>
            <th>Valor Total</th>
            <th>Ações</th>
          </tr>
          {getLinhasDaTabela()}
        </tbody>
      </table>
    );
  }

  function getConteudo() {
    if (venda == null) {
      return (
        <>
          <button type="button" onClick={novaVenda}>
            Nova venda
          </button>
          {getTabela()}
        </>
      );
    } else {
      return getFormulario();
    }
  }

  return (
    <div className="vendas">
      <div className="conteudo">
        <h2>Cadastro de vendas</h2>
        {getConteudo()}
      </div>
    </div>
  );
}

export default Vendas;
