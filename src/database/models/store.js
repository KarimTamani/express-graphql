const { DataTypes } = require("sequelize");
export default (Sequelize) => {
	const Store = Sequelize.define("Store", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
			unique: true,
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			onDelete: "cascade",
			references: { model: "users", key: "id" },
		},
		name: { type: DataTypes.STRING, allowNull: false },
		bio: { type: DataTypes.STRING },
		rating: { type: DataTypes.TINYINT },
		addressId: {
			type: DataTypes.INTEGER,
			onDelete: "cascade",
			references: { model: "addresses", key: "id" },
		},
	});
	Store.associate = (models) => {
		Store.belongsTo(models.Address, {
			as: "address",
			foreignKey: "addressId",
		});
		 
		Store.belongsTo(models.User, {
			as: "user",
			foreignKey: "userId",
		});
	 
		 
	};
	return Store;
};
