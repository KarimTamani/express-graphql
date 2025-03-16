const { DataTypes } = require("sequelize");

export default (Sequelize) => {

    const Wilaya = Sequelize.define("Wilaya", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
 

    Wilaya.associate = (models) => {
        
        
        Wilaya.hasMany(models.Baladia , {
            foreignKey : "wilayaId" , 
            as : "baladiat"
        }) ; 




    } 
    return Wilaya;
}