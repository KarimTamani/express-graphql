"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.createTable("stores", {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
				unique: true,
			},
			userId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				onDelete: "cascade",
				references: { model: "users", key: "id" },
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			bio: { type: Sequelize.STRING },
			rating: {
				type: Sequelize.TINYINT,
				defaultValue: 0,
			},
			addressId: {
				type: Sequelize.INTEGER,
				onDelete: "cascade",
				references: {
					model: "addresses",
					key: "id",
				},
			},
		});
	},
	async down(queryInterface, Sequelize) {
		return queryInterface.dropTable("stores");
	},
};
