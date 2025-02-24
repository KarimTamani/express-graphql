const { DataTypes } = require("sequelize");
export default (Sequelize) => {
	const User = Sequelize.define("User", {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
			unique: true,
			defaultValue: DataTypes.UUIDV4,
		},
		name: {
			type: DataTypes.CHAR.BINARY,
			allowNull: false,
			defaultValue: "tamani",
			validate: { len: [3, 56] },
		},
		lastname: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: "karim",
			validate: { len: [3, 56], is: /^[a-zA-Z ]+$/ },
		},
		bio: { type: DataTypes.TEXT("medium") },
		birthday: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: "2025-02-02 23:00:00",
		},
		age: {
			type: DataTypes.MEDIUMINT.ZEROFILL.UNSIGNED,
			defaultValue: 20,
			validate: { min: 18, max: 99 },
		},
		score: {
			type: DataTypes.FLOAT.ZEROFILL.UNSIGNED,
			defaultValue: 569.2,
		},
		rating: {
			type: DataTypes.DOUBLE.ZEROFILL.UNSIGNED,
			defaultValue: 4.5,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: { isEmail: true, len: [3, 255] },
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		phoneNumber: {
			type: DataTypes.STRING,
			validate: { is: /^\+?[1-9]\d{1,14}$/ },
		},
		status: {
			type: DataTypes.ENUM(
				"developer",
				"user",
				"manager",
				"admin",
			),
			defaultValue: "user",
		},
		profilePicture: { type: DataTypes.STRING },
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: Sequelize.literal(
				"CURRENT_TIMESTAMP",
			),
		},
		isActive: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: Sequelize.literal(
				"CURRENT_TIMESTAMP",
			),
		},
	});
	User.associate = (models) => {
		User.hasMany(models.UserInterests, {
			as: "userInterests",
			foreignKey: "userId",
		});
		User.hasOne(models.Address, {
			as: "address",
			foreignKey: "userId",
		});
		User.belongsToMany(models.Interest, {
			as: "interests",
			through: models.UserInterests,
			foreignKey: "userId",
		});
	};
	return User;
};
