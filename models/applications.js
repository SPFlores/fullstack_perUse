module.exports = (sequelize, Sequelize) => {
  class Application extends Sequelize.Model { }
  Application.init({
    motivation: { type: Sequelize.TEXT, allowNull: false, isAlphanumeric: true, len: [2] },
    coverLetter: { type: Sequelize.TEXT, allowNull: false, isAlphanumeric: true, len: [2] }
  }, {
    sequelize,
    modelName: 'application'
  })

  return Application
}
