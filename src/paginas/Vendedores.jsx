import axios from "axios";
import { useState, useEffect } from "react";

function Vendedores() {
  const [vendedor, setVendedor] = useState(null);
  const [vendedores, setVendedores] = useState([]);

  function getVendedores() {
    axios.get("http://localhost:3005/vendedor").then((resposta) => {
      setVendedores(resposta.data);
    });
  }

  useEffect(() => {
    getVendedores();
  }, []);

  function novoVendedor() {
    setVendedor({
      codigo: 0,
      nome: "",
      ctps: "",
      dataContratacao: null,
      valorVendido: 0
    });
  }

  function alterarVendedor(campo, valor) {
    setVendedor((prevVendedor) => ({
      ...prevVendedor,
      [campo]: valor
    }));
  }

  function excluirVendedor(id) {
    axios.delete("http://localhost:3005/vendedor/" + id).then(() => {
      reiniciarEstadoDosObjetos();
    });
  }

  function salvarVendedor() {
    if (vendedor._id) {
      axios.put("http://localhost:3005/vendedor/" + vendedor._id, vendedor).then(() => {
        reiniciarEstadoDosObjetos();
      });
    } else {
      axios.post("http://localhost:3005/vendedor", vendedor).then(() => {
        reiniciarEstadoDosObjetos();
      });
    }
  }

  function reiniciarEstadoDosObjetos() {
    setVendedor(null);
    getVendedores();
  }

  function getFormulario() {
    return (
      <form>
        <label>Código</label>
        <input
          type="number"
          name="codigo"
          value={vendedor.codigo}
          onChange={(e) => {
            alterarVendedor(e.target.name, parseInt(e.target.value));
          }}
        />
        <label>Nome</label>
        <input
          type="text"
          name="nome"
          value={vendedor.nome}
          onChange={(e) => {
            alterarVendedor(e.target.name, e.target.value);
          }}
        />
        <label>CTPS</label>
        <input
          type="text"
          name="ctps"
          value={vendedor.ctps}
          onChange={(e) => {
            alterarVendedor(e.target.name, e.target.value);
          }}
        />
        <label>Data de Contratação</label>
        <input
          type="date"
          name="dataContratacao"
          value={vendedor.dataContratacao}
          onChange={(e) => {
            alterarVendedor(e.target.name, e.target.value);
          }}
        />
        <label>Valor Vendido</label>
        <input
          type="number"
          name="valorVendido"
          value={vendedor.valorVendido}
          onChange={(e) => {
            alterarVendedor(e.target.name, parseFloat(e.target.value));
          }}
        />
        <button type="button" onClick={salvarVendedor}>
          Salvar
        </button>
        <button type="button" onClick={() => setVendedor(null)}>
          Cancelar
        </button>
      </form>
    );
  }

  function getLinhaDaTabela(vendedor) {
    return (
      <tr key={vendedor._id}>
        <td>{vendedor.codigo}</td>
        <td>{vendedor.nome}</td>
        <td>{vendedor.ctps}</td>
        <td>{vendedor.dataContratacao}</td>
        <td>{vendedor.valorVendido}</td>
        <td>
          <button
            type="button"
            onClick={() => {
              if (
                window.confirm(
                  "Confirmar a exclusão do vendedor " + vendedor.nome + "?"
                )
              ) {
                excluirVendedor(vendedor._id);
              }
            }}
          >
            Excluir
          </button>
          <button
            type="button"
            onClick={() => {
              setVendedor(vendedor);
            }}
          >
            Editar
          </button>
        </td>
      </tr>
    );
  }

  function getLinhasDaTabela() {
    return vendedores.map((vendedor) => getLinhaDaTabela(vendedor));
  }

  function getTabela() {
    return (
      <table>
        <tbody>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>CTPS</th>
            <th>Data de Contratação</th>
            <th>Valor Vendido</th>
            <th>Ações</th>
          </tr>
          {getLinhasDaTabela()}
        </tbody>
      </table>
    );
  }

  function getConteudo() {
    if (vendedor == null) {
      return (
        <>
          <button type="button" onClick={novoVendedor}>
            Novo vendedor
          </button>
          {getTabela()}
        </>
      );
    } else {
      return getFormulario();
    }
  }

  return (
    <div className="vendedores">
      <div className="conteudo">
        <h2>Cadastro de vendedores</h2>
        {getConteudo()}
      </div>
    </div>
  );
}

export default Vendedores;
