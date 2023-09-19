const Sequelize = require('sequelize');
const db = require('../DataBase/database');

const Employee = db.define('Employee', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    dateCreated: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
    department: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, 
{
    // ne Ajouter la colone createdAt
    createdAt: false,

    // ne Ajouter la colone updatedAt
    updatedAt: false,
}
);

db.sync({ forced: true });

module.exports = Employee;