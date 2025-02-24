const { DataTypes } = require("sequelize");
export default (Sequelize) => {
	const City = Sequelize.define("City", {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
			unique: true,
			defaultValue: DataTypes.UUIDV4,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		cityCode: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		countryId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			onDelete: "cascade",
			references: { model: "countries", key: "id" },
		},
	});
	City.associate = (models) => {
		City.hasMany(models.Address, {
			as: "addresses",
			foreignKey: "cityId",
		});
		City.belongsTo(models.Country, {
			as: "country",
			foreignKey: "countryId",
		});
	};
	return City;
};
