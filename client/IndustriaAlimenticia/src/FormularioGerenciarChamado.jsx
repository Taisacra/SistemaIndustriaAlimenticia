import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function FormularioChamado({chamados, setChamados}){
    const [formData, setFormData] = useState({
        id_usuario: '',
        descricao_chamado: '',
        nome_setor: '',
        prioridade: '',
        data_cadastro: '',
        status: ''
    })

    const handleChange = (e) => {
        const { descricao_chamado, value } = e.target;
        setFormData({ ...formData, [descricao_chamado]: value });
    };
    const handleIncluir = () => {
        Axios.post("http://localhost:3600/chamado/editar", {
            id_usuario: formData.id_usuario,
            descricao_chamado: formData.descricao_chamado,
            nome_setor: formData.nome_setor,
            prioridade: formData.prioridade,
            data_cadastro: formData.data_cadastro,
            status: formData.status,
            action: "incluir",
        })
        .then((response) => {
          setChamados([...chamados, response.data]);
          setFormData({
            id_usuario: '',
            descricao_chamado: '',
            nome_setor: '',
            prioridade: '',
            data_cadastro: '',
            status: ''
          });
        })
        .catch((error) => {
          console.error("Erro ao incluir Chamado:", error);
        });
      };


      const handleAtualizar = () => {
        Axios.post("http://localhost:3600/chamado/editar", {
            id_usuario: formData.id_usuario,
            descricao_chamado: formData.descricao_chamado,
            nome_setor: formData.nome_setor,
            prioridade: formData.prioridade,
            data_cadastro: formData.data_cadastro,
            status: formData.status,
          action: "alterar",
        })
        .then((response) => {
          setChamados(chamados.map((chamado) =>
            chamado.id === response.data.id ? response.data : chamado
          ));
          setFormData({
            id_usuario: '',
            descricao_chamado: '',
            nome_setor: '',
            prioridade: '',
            data_cadastro: '',
            status: ''
          });
        })
        .catch((error) => {
          console.error("Erro ao atualizar Chamado:", error);
        });
      };

      const handleCarregar = (chamado) => {
        setFormData({
            id: chamado.id,
            id_usuario: chamado.id_usuario,
            descricao_chamado: chamado.descricao_chamado,
            nome_setor: chamado.nome_setor,
            prioridade: chamado.prioridade,
            data_cadastro: chamado.data_cadastro,
            status: chamado.status
        });
      };

      const handleExcluir = (id) => {
        Axios.post(`http://localhost:3600//chamado/excluir/${id}`)
          .then(() => {
            // Remove a disciplina excluída da lista de disciplinas no estado
            setChamados(chamados.filter(chamado => chamado.id !== id));
          })
          .catch((error) => {
            console.error("Erro ao excluir chamado:", error);
          });
      };

    return(
        <div>
            <h2>Chamado</h2>
            <form>
                <div>
                    <label>Descrição: </label>
                    <input type="text" name="descricao_chamado" value={formData.descricao_chamado || ''} onChange={handleChange} />
                </div>
                <div>
                    <label>Setor: </label>
                    <input type="text" name="nome_setor" value={formData.nome_setor || ''} onChange={handleChange} />
                </div>
                <br />
                <button type="button" onClick={handleIncluir}>Incluir</button>
                <button type="button" onClick={handleAtualizar}>Atualizar</button>
            </form>
            <h3>Relação de Usuárias</h3>
            <table border="1" cellPadding="5" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario, index)=> (
                        <tr key={index}>
                            <td>{usuario.nome}</td>
                            <td>{usuario.email}</td>
                            <td>
                                <button type="button" onClick={() => handleExcluir(usuario.id)}>Excluir</button>
                                <button button type="button" onClick={() => handleCarregar(usuario)}>Editar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default FormularioChamado;