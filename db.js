const path = require('path');
const { Sequelize, Model } = require('sequelize');

// TODO - create the new sequelize connection
const sequelize = new Sequelize({
    dialect: 'splite',
    storage: path.join(__dirname, 'db.splite')
});

module.exports = {
    sequelize,
    Sequelize
};
