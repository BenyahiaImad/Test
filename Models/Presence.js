const Sequelize = require('sequelize');
const db = require('../DataBase/database'); 

const Presence = db.define('Presence', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    checkInTime: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    checkOutTime: {
        type: Sequelize.DATE,
    },
    comment: {
        type: Sequelize.STRING,
    },
    timeDifference: {
      type: Sequelize.INTEGER,
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

module.exports = Presence;