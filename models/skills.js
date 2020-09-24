module.exports = (sequelize, Sequelize) => {
  class Skill extends Sequelize.Model { }
  Skill.init({
    skill: { type: Sequelize.STRING, allowNull: false, isAlphanumeric: true, len: [2] }
  }, {
    sequelize,
    modelName: 'skill'
  })

  return Skill
}
