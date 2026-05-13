const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class UserProfile extends Model {

        static associate(models) {
            UserProfile.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'user'
            });
        }

        getDisplayNameUpper() {
            return this.display_name.toUpperCase();
        }
    }
    UserProfile.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER
        },
        image: {
            type: DataTypes.STRING,
        },
        display_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: DataTypes.STRING
    }, {
        sequelize,
        modelName: "UserProfile",
        tableName: "UserProfiles",
        timestamps: true,
        underscored: true
    });
    return UserProfile;
}