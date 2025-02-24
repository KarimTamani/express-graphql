const { DataTypes } = require("sequelize");
export default (Sequelize) => {
	const Country = Sequelize.define("Country", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
			unique: true,
		},
		name: { type: DataTypes.STRING, allowNull: false },
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: Sequelize.literal(
				"CURRENT_TIMESTAMP",
			),
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: Sequelize.literal(
				"CURRENT_TIMESTAMP",
			),
		},
	});
	Country.associate = (models) => {
		Country.hasMany(models.City, {
			as: "cities",
			foreignKey: "countryId",
		});
	};
	return Country;
};
