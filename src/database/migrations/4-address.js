"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.createTable("addresses", {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				allowNull: false,
				unique: true,
				defaultValue: Sequelize.UUIDV4,
			},
			street: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			latit: { type: Sequelize.DOUBLE },
			longt: { type: Sequelize.DOUBLE },
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal(
					"CURRENT_TIMESTAMP",
				),
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal(
					"CURRENT_TIMESTAMP",
				),
			},
			userId: {
				type: Sequelize.UUID,
				allowNull: false,
				onDelete: "cascade",
				references: { model: "users", key: "id" },
			},
			cityId: {
				type: Sequelize.UUID,
				allowNull: false,
				onDelete: "cascade",
				references: { model: "cities", key: "id" },
			},
		});
	},
	async down(queryInterface, Sequelize) {
		return queryInterface.dropTable("addresses");
	},
};
