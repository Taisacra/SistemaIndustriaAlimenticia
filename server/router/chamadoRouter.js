const { application } = require('express');
const express = require('express');
const Router = express.Router();
const Chamado = require('../database/chamado');
const Usuario = require('../database/usuario'); // Importe o modelo de Usuario

Router.get("/", async (req, res) => {
    try {
        const chamados = await Chamado.findAll({
            order: [["id", "ASC"]],
            include: [
                {
                    model: Usuario,
                    as: 'usuario',
                    attributes: ['nome'] // Apenas o nome do usuário
                }
            ]
        });

        if (!chamados || chamados.length === 0) {
            return res.status(400).json({ message: "Nenhum chamado encontrado." });
        }

        res.status(200).json({ chamados });
    } catch (error) {
        console.error("Erro ao buscar chamados: ", error);
        res.status(500).json({ error: "Erro ao buscar chamados" });
    }
});


Router.post("/editar", async (req,res)=>{
    const{id_usuario, descricao_chamado, nome_setor, prioridade,data_cadastro, status, action} = req.body
    if(action === "cadastrar"){
        try {
            const chamados = await Chamado.create({
                id_usuario,
                descricao_chamado,
                nome_setor,
                prioridade,
                data_cadastro,
                status
            });
            res.status(201).json(chamados)
        } catch (error) {
            console.error("Erro ao inserir dados PARA CHAMADO.", error);
            res
            .status(500)
            .json({error: "Erro ao inserir dados PARA CHAMADO."})
        }
    }

    if(action === "alterar"){
        try {
            const {id} = req.body;
            const chamado = await Chamado.findByPk(id);
                if(!chamado){
                    return res.status(400).json({
                        error: `Chamado não foi encontrado - ID: $(id)`
                    });
                }
            chamado.id_usuario = id_usuario;
            chamado.descricao_chamado =descricao_chamado;
            chamado.nome_setor = nome_setor;
            chamado.prioridade = prioridade;
            chamado.data_cadastro = data_cadastro;;
            chamado.status = status;
            await chamado.save();
            res.status(200).json(chamado);
         } catch (error) {
                console.log(Chamado);
                console.error(`Erro ao ALTERAR dados PARA CHAMADO: ${descricao_chamado}`,
                error),
                res.status(500).json({
                    error: `Erro ao ALTERAR dados PARA CHAMADO: ${descricao_chamado}`
                });
        }
    }
});

Router.post("/excluir/:id", async(req,res)=>{
    try {
        const id = req.params.id
        const chamado = await Chamado.findByPk(id)
        if(!chamado){
            return res.status(404).json({error: "ID não escontrado. "})
        }
        await Chamado.destroy({where: {id: id}})
        //res.status(200).json({ message: "Chamado excluído com sucesso." });
        res.redirect("/chamado");
    } catch (error) {
        console.error("Erro ao excluir dados: ", error);
        res.status(500).json({error: "Erro ao excluir dados da tabela de Chamados."});
    }
});

module.exports = Router