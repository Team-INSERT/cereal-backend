module.exports = (sequelize, DataTypes) => {
	const room = sequelize.define('room',{
			roomId: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
		},
		{
			timestamps: true,
			underscored: false,
			modelName: 'room',
			tableName: 'room',
			paranoid: false,
			charset: 'utf8',
			collate: 'utf8_general_ci',
		}
	)
	room.associate = (model) => {
		room.belongsTo(model.user, { foreignKey: 'code', sourceKey: 'code' })
	}

	return room
}
