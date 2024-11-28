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

    const [usuarios, setUsuarios] = useState([]); // Estado para armazenar usuários

    useEffect(() => {
      // Buscar usuários ao carregar o componente
      Axios.get("http://localhost:3600/usuario/")
        .then((response) => {
          setUsuarios(response.data.usuarios);
        })
        .catch((error) => {
          console.error("Erro ao buscar usuários:", error);
          alert("Erro ao carregar a lista de usuários.");
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

    const handleIncluir = () => {
        if (!formData.descricao_chamado || !formData.nome_setor || !formData.id_usuario) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
        Axios.post("http://localhost:3600/chamado/editar", {
            id_usuario: formData.id_usuario,
            descricao_chamado: formData.descricao_chamado,
            nome_setor: formData.nome_setor,
            prioridade: formData.prioridade,
            data_cadastro: formData.data_cadastro,
            status: formData.status,
            action: "Cadastrar",
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
          alert("Usuário cadastrado com sucesso!");
        })
        .catch((error) => {
          console.error("Erro ao cadastrar Chamado:", error);
          alert("Erro ao cadastrar usuário.");
        });
      };


      

      return (
        <div>
          <h2>Chamado</h2>
          <form>
            <div>
              <label>Descrição: </label>
              <input type="text" name="descricao_chamado" value={formData.descricao_chamado || ''} onChange={handleChange}/>
            </div>
            <div>
              <label>Setor: </label>
              <input type="text" name="nome_setor" value={formData.nome_setor || ''} onChange={handleChange}/>
            </div>
            <div>
              <label>Usuário:</label>
              <select name="id_usuario" value={formData.id_usuario || ''} onChange={handleChange}>
                <option value="">Selecione um usuário</option>
                {usuarios.map((usuario) => (
                  <option key={usuario.id} value={usuario.id}>
                    {usuario.nome}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Prioridade:</label>
              <select name="prioridade" value={formData.prioridade || ''} onChange={handleChange}>
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
              </select>
            </div>
            <br />
            <button type="button" onClick={handleIncluir}>Cadastrar</button>
          </form>
        </div>
      );
}

export default FormularioChamado;