const Sequelize = require("sequelize");
const connection = require("./database");

const Resposta = connection.define("respostas",{
    corpo: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true
    },
    perguntaId:{
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    }
});

Resposta.sync({force: false});
module.exports = Resposta;