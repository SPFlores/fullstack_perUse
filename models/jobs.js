module.exports = (sequelize, Sequelize) => {
  class Job extends Sequelize.Model { }
  Job.init({
    title: { type: Sequelize.STRING, allowNull: false, isAlphanumeric: true, len: [2] },
    company: { type: Sequelize.STRING, allowNull: false, isAlphanumeric: true, len: [2] },
    // type: { type: Sequelize.STRING, allowNull: false, isAlphanumeric: true, len: [2] },
    // locationAt: { type: Sequelize.STRING, allowNull: false, isAlphanumeric: true, len: [2] },
    description: { type: Sequelize.TEXT, allowNull: false, isAlphanumeric: true, len: [1] }
  }, {
    sequelize,
    modelName: 'job'
  })

  return Job
}
