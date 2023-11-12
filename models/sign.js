"use strict";

const { Model } = require("sequelize");

// module.exports = (sequelize, DataTypes) => {
//   const Signs = sequelize.define("Signs", {
//     userId: {
//       primaryKey: true,
//       type: DataTypes.INTEGER,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     nickname: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     check_password: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     createdAt: {
//       type: Sequelize.DATE,
//       allowNull: false,
//     },
//     updatedAt: {
//       type: Sequelize.DATE,
//       allowNull: false,
//     },
//     tableName: "Signs",
//   });
//   return Signs;
// };

module.exports = (sequelize, DataTypes) => {
  class Signs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Signs.hasMany(models.Products, { foreignKey: "userId" });
    }
  }
  Signs.init(
    {
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
      },
      nickname: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Signs",
    }
    // {
    //   userId: {
    //     primaryKey: true,
    //     type: DataTypes.INTEGER,
    //   },
    //   email: {
    //     type: DataTypes.STRING,
    //     allowNull: true,
    //   },
    //   nickname: {
    //     type: DataTypes.STRING,
    //     allowNull: true,
    //   },
    //   password: {
    //     type: DataTypes.STRING,
    //     allowNull: true,
    //   },
    //   check_password: {
    //     type: DataTypes.STRING,
    //     allowNull: true,
    //   },
    // },
    // {
    //   sequelize,
    //   modelName: "Signs",
    // }
  );
  return Signs;
};
