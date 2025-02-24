const { DataTypes } = require("sequelize");
export default (Sequelize) => {
	const Address = Sequelize.define("Address", {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
			unique: true,
			defaultValue: DataTypes.UUIDV4,
		},
		street: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		latit: { type: DataTypes.DOUBLE },
		longt: { type: DataTypes.DOUBLE },
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
		userId: {
			type: DataTypes.UUID,
			allowNull: false,
			onDelete: "cascade",
			references: { model: "users", key: "id" },
		},
		cityId: {
			type: DataTypes.UUID,
			allowNull: false,
			onDelete: "cascade",
			references: { model: "cities", key: "id" },
		},
	});
	Address.associate = (models) => {
		Address.belongsTo(models.City, {
			as: "city",
			foreignKey: "cityId",
		});
		Address.belongsTo(models.User, {
			as: "user",
			foreignKey: "userId",
		});
	};
	return Address;
};
