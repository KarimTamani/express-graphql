'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
       id: {
        type : Sequelize.INTEGER , 
        autoIncrement : true , 
        primaryKey : true , 
        allowNull : false , 
      } , 
      firstName : {
        type : Sequelize.STRING , 
        allowNull : false 
      } , 
      lastName : {
        type : Sequelize.STRING , 
        allowNull : false 
      } , 
      email : {
        type : Sequelize.STRING , 
        allowNull : false 
      } ,  
      password : {
        type : Sequelize.STRING , 
        allowNull : false 
      }  , 

      age : { 
        type : Sequelize.INTEGER ,
        allowNull : false , 
        defaultValue : 18  
      } , 

      type :{
        type : Sequelize.ENUM(["admin" , "buyer" , "seller"]) , 
        allowNull : false , 
        defaultValue : "buyer"
      }
      
    });
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.dropTable('users');
  }
};
