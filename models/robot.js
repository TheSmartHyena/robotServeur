const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class Robot extends Model {}

exports.initRobot = async function(app) {

    await Robot.init({
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.FLOAT

  }, { sequelize, modelName: 'robot' });

    await sequelize.sync();
    const walle = await Robot.create({
      name: 'Wall-e',
      description: 'Recycling robot, very kind',
      price: 36.30
    });

    console.log(walle.toJSON());
    app.models.Robot = Robot;
};
