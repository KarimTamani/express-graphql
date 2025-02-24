"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.createTable("users", {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				allowNull: false,
				unique: true,
				defaultValue: Sequelize.UUIDV4,
			},
			name: {
				type: Sequelize.CHAR.BINARY,
				allowNull: false,
				defaultValue: "tamani",
			},
			lastname: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: "karim",
			},
			bio: { type: Sequelize.TEXT("medium") },
			birthday: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: "2025-02-02 23:00:00",
			},
			age: {
				type: Sequelize.MEDIUMINT.ZEROFILL.UNSIGNED,
				defaultValue: 20,
			},
			score: {
				type: Sequelize.FLOAT.ZEROFILL.UNSIGNED,
				defaultValue: 569.2,
			},
			rating: {
				type: Sequelize.DOUBLE.ZEROFILL.UNSIGNED,
				defaultValue: 4.5,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			phoneNumber: { type: Sequelize.STRING },
			status: {
				type: Sequelize.ENUM(
					"developer",
					"user",
					"manager",
					"admin",
				),
				defaultValue: "user",
			},
			profilePicture: { type: Sequelize.STRING },
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal(
					"CURRENT_TIMESTAMP",
				),
			},
			isActive: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal(
					"CURRENT_TIMESTAMP",
				),
			},
		});
	},
	async down(queryInterface, Sequelize) {
		return queryInterface.dropTable("users");
	},
};
