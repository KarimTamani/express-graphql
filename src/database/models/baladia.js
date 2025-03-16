const { DataTypes } = require("sequelize");
export default (Sequelize) => {
	const Baladia = Sequelize.define("Baladia", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
			unique: true,
		},
		wilayaId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			onDelete: "cascade",
			references: { model: "wilayas", key: "id" },
		},
		name: { type: DataTypes.STRING, allowNull: false },
		codePostal: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	}, {
        tableName : "baladias"
    });
	Baladia.associate = (models) => {
		Baladia.belongsTo(models.Wilaya, {
			as: "wilaya",
			foreignKey: "wilayaId",
		});
		Baladia.hasMany(models.Address, {
			as: "addresses",
			foreignKey: "baladiaId",
		});
	};
	return Baladia;
};
