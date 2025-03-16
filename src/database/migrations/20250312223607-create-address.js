"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.createTable("addresses", {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
				unique: true,
			},
			streetLine: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			latitude: {
				type: Sequelize.DOUBLE,
				allowNull: false,
			},
			long: {
				type: Sequelize.DOUBLE,
				allowNull: false,
			},
			userId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				onDelete: "cascade",
				references: { model: "users", key: "id" },
			},
			baladiaId: {
				type: Sequelize.INTEGER,
				onDelete: "SET NULL",
				references: {
					model: "baladias",
					key: "id",
				},
			},
		});
	},
	async down(queryInterface, Sequelize) {
		return queryInterface.dropTable("addresses");
	},
};
