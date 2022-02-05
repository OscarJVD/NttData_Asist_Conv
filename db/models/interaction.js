const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    User.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'user'
        },
        root: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        avatar: {
            type: DataTypes.STRING,
            defaultValue: 'https://res.cloudinary.com/linda-leblanc/image/upload/v1612634594/test/male_ava_klfutu.svg'
        }
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};
