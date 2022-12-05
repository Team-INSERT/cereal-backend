module.exports = (sequelize, DataTypes) => {
    const chatting = sequelize.define("chatting", {
        contents: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    }, {
        timestamps: true,
        underscored: false,
        modelName: 'chatting',
        tableName: 'chatting',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });
    chatting.associate = function (model) {
        model.chatting.belongsTo(model.user, {
            foreignKey: 'code',
            sourceKey: 'code'
        });
    };
    return chatting;
}