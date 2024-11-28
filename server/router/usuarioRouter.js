const { application } = require('express');
const express = require('express');
const Router = express.Router();
const Usuario = require('../database/usuario');

Router.get("/", async (req,res)=>{
    try {
        const usuarios = await Usuario.findAll({
            res: true,
            order: [["id", "ASC" ]],
        });
        if(!usuarios || usuarios.legth === 0){
            return res
            .status(400)
            .json({message: "Nenhum usuario encontrado."});
        }
        res.status(200).json({ usuarios });
    } catch (error) {
        console.error("Erro ao buscar usuarios: ", error);
        res.status(500).json({error: "Erro ao buscar ususarios"});
    }
});

Router.post("/cadastrar", async (req,res)=>{
    const{nome, email,action} = req.body
    if(action === "cadastrar"){
        try {
            const usuarios = await Usuario.create({
                nome,
                email
            });
            res.status(201).json(usuarios)
        } catch (error) {
            console.error("Erro ao inserir dados PARA USUÁRIO.", error);
            res
            .status(500)
            .json({error: "Erro ao inserir dados PARA USUARIO."})
        }
    }

    if(action === "alterar"){
        try {
            const {id} = req.body;
            const usuario = await Usuario.findByPk(id);
                if(!usuario){
                    return res.status(400).json({
                        error: `Usuário não foi encontrado - ID: $(id)`
                    });
                }
            usuario.nome = nome;
            usuario.email = email;
            await usuario.save();
            res.status(200).json(usuario);
         } catch (error) {
                console.log(Usuario);
                console.error(`Erro ao ALTERAR dados PARA USUARIO: ${nome}`,
                error),
                res.status(500).json({
                    error: `Erro ao ALTERAR dados PARA USUARIO: ${nome}`
                });
        }
    }
});

Router.post("/excluir/:id", async(req,res)=>{
    try {
        const id = req.params.id
        const usuario = await Usuario.findByPk(id)
        if(!usuario){
            return res.status(404).json({error: "ID não escontrado. "})
        }
        await Usuario.destroy({where: {id: id}})
        res.status(200).json({ message: "Usuário excluído com sucesso." });
        res.redirect("/usuario");
    } catch (error) {
        console.error("Erro ao excluir dados: ", error);
        res.status(500).json({error: "Erro ao excluir dados da tabela de usuários."});
    }
});

module.exports = Router