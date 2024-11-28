const { DataTypes} = require('sequelize');
const sequelize = require('./database');
const Usuario = require('./usuario');

const Chamado = sequelize.define('Chamado', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,

    },
    id_usuario:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Usuario, // Associa ao modelo Sistema
          key: 'id',
        },
    },
    descricao_chamado:{
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    nome_setor:{
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    prioridade:{
        type: DataTypes.ENUM('baixa','media','alta'),
        allowNull: false,
        default: 'baixa',
    },
    data_cadastro:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    status:{
        type: DataTypes.ENUM('a fazer','em andamento','concluida'),
        allowNull: false,
        default: 'a fazer',
    }
},
    {
        tableName: 'chamado',
        timestamps: false,
    }
);

Chamado.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'usuario' });

module.exports = Chamado;