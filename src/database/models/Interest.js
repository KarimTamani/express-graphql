const { DataTypes } = require("sequelize");
export default (Sequelize) => {
	const Interest = Sequelize.define("Interest", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
			unique: true,
		},
		label: {
			type: DataTypes.STRING.BINARY,
			allowNull: false,
			unique: true,
			validate: { len: [3, 255] },
		},
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
	Interest.associate = (models) => {
		Interest.hasMany(models.UserInterests, {
			as: "userInterests",
			foreignKey: "interestId",
		});
		Interest.belongsToMany(models.User, {
			as: "users",
			through: models.UserInterests,
			foreignKey: "interestId",
		});
	};
	return Interest;
};
