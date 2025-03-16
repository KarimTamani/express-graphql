const { DataTypes } = require("sequelize");
export default (Sequelize) => {
	const Address = Sequelize.define("Address", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
			unique: true,
		},
		streetLine: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		latitude: {
			type: DataTypes.DOUBLE,
			allowNull: false,
		},
		long: { type: DataTypes.DOUBLE, allowNull: false },
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			onDelete: "cascade",
			references: { model: "users", key: "id" },
		},
		baladiaId: {
			type: DataTypes.INTEGER,
			onDelete: "set_null",
			references: { model: "baladias", key: "id" },
		},
	});
	Address.associate = (models) => {
		Address.belongsTo(models.User, {
			as: "user",
			foreignKey: "userId",
		});
		Address.hasMany(models.Store, {
			as: "stores",
			foreignKey: "addressId",
		});
		Address.belongsTo(models.Baladia, {
			as: "baladia",
			foreignKey: "baladiaId",
		});
	};
	return Address;
};
