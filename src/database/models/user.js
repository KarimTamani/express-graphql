const { DataTypes } = require("sequelize");
export default (Sequelize) => {
	const User = Sequelize.define("User", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
			unique: true,
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: { isEmail: true },
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		age: { type: DataTypes.TINYINT, allowNull: false },
	 
		type: {
			type: DataTypes.ENUM(
				"buyer",
				"seller",
				"admin",
			),
			allowNull: false,
		},
	});
	User.associate = (models) => {
		User.hasMany(models.Store, {
			as: "stores",
			foreignKey: "userId",
		});
		User.hasOne(models.Address, {
			as: "address",
			foreignKey: "userId",
		});
	 
	};
	return User;
};
