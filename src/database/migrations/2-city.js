"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.createTable("cities", {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				allowNull: false,
				unique: true,
				defaultValue: Sequelize.UUIDV4,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			cityCode: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			countryId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				onDelete: "cascade",
				references: {
					model: "countries",
					key: "id",
				},
			},
		});
	},
	async down(queryInterface, Sequelize) {
		return queryInterface.dropTable("cities");
	},
};
