module.exports = (sequelize, DataTypes) => {
  const Film = sequelize.define("Film", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nama_film: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
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
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Film;
};
