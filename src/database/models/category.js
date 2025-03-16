const { DataTypes } = require("sequelize");

export default (Sequelize) => {

    const Category = Sequelize.define("Category", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
 
    return Category;
}