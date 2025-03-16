"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.createTable("baladias", {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
				unique: true,
			},
			wilayaId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				onDelete: "cascade",
				references: { model: "wilayas", key: "id" },
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			codePostal: {
				type: Sequelize.STRING,
				allowNull: false,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		return queryInterface.dropTable("baladias");
	},
};
