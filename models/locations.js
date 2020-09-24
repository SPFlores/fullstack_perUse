module.exports = (sequelize, Sequelize) => {
  class Location extends Sequelize.Model { }
  Location.init({
    location: { type: Sequelize.STRING, allowNull: false, isAlphanumeric: true, len: [2] }
  }, {
    sequelize,
    modelName: 'location'
  })

  return Location
}
