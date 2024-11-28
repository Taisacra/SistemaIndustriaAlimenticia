import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function FormularioUsuario({usuarios, setUsuarios}){
    const [formData, setFormData] = useState({
        nome: '',
        email: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleIncluir = () => {
        if (!formData.nome || !formData.email) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        Axios.post("http://localhost:3600/usuario/cadastrar", {
          nome: formData.nome,
          email: formData.email,
          action: "cadastrar",
        })
        .then((response) => {
          setUsuarios([...usuarios, response.data]);// Atualiza a lista de usuários
          setFormData({nome: '', email: ''});  // Limpa o formulário
          alert("Usuário cadastrado com sucesso!");
        })
        .catch((error) => {
          console.error("Erro ao cadastrar Usuário:", error);
          alert("Erro ao cadastrar usuário.");
        });
      };

      return(
        <div>
            <h2>Cadastro de Usuário</h2>
            <form>
                <div>
                    <label>Nome: </label>
                    <input type="text" name="nome" value={formData.nome || ''} onChange={handleChange} />
                </div>
                <div>
                    <label>E-mail: </label>
                    <input type="text" name="email" value={formData.email || ''} onChange={handleChange} />
                </div>
                <br />
                <button type="button" onClick={handleIncluir}>Cadastar</button>
            </form>
        </div>
    );


}
export default FormularioUsuario;