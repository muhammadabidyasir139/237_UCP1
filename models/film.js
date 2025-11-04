const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");

const Film = sequelize.define(
  "Film",
  {
    nama_film: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deskripsi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sutradara: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tahun_terbit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sutradara: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

module.exports = User;
