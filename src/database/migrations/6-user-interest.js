"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.createTable("userInterests", {
			userId: {
				type: Sequelize.UUID,
				allowNull: false,
				onDelete: "cascade",
				references: { model: "users", key: "id" },
			},
			interestId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				onDelete: "cascade",
				references: {
					model: "interests",
					key: "id",
				},
			},
		});
	},
	async down(queryInterface, Sequelize) {
		return queryInterface.dropTable("userInterests");
	},
};
