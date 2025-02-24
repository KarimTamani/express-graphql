const { DataTypes } = require("sequelize");
export default (Sequelize) => {
	const UserInterests = Sequelize.define(
		"UserInterests",
		{
			userId: {
				type: DataTypes.UUID,
				allowNull: false,
				onDelete: "cascade",
				references: { model: "users", key: "id" },
			},
			interestId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				onDelete: "cascade",
				references: {
					model: "interests",
					key: "id",
				},
			},
		},
	);
	UserInterests.associate = (models) => {
		UserInterests.belongsTo(models.User, {
			as: "user",
			foreignKey: "userId",
		});
		UserInterests.belongsTo(models.Interest, {
			as: "interest",
			foreignKey: "interestId",
		});
	};
	return UserInterests;
};
