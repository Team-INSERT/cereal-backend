module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define("user", {
        code: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        nickname: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        enrolled: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        grade: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        class: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        studentNo: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
    }, {
        timestamps: false,
        underscored: false,
        modelName: 'user',
        tableName: 'user',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });
    user.associate = model => {
        user.hasMany(model.chatting, { foreignKey: "code", sourceKey: 'code' });
        model.user.hasOne(model.room, {
            foreignKey: 'code',
            sourceKey: 'code'
        });
    };
    return user;
};