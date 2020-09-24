module.exports = (sequelize, Sequelize) => {
  class TypeofJob extends Sequelize.Model { }
  TypeofJob.init({
    typeofjob: { type: Sequelize.STRING, allowNull: false, isAlphanumeric: true, len: [2] }
  }, {
    sequelize,
    modelName: 'typeofjob'
  })

  return TypeofJob
}
