module.exports = (sequelize, Sequelize) => {
  class User extends Sequelize.Model { }
  User.init({
    name: { type: Sequelize.STRING, allowNull: false, isAlphanumeric: true, len: [2] },
    email: { type: Sequelize.STRING, allowNull: false, isEmail: true },
    password: { type: Sequelize.STRING, allowNull: false, notContains: 'password', len: [8, 24] },
    role: { type: Sequelize.STRING, allowNull: false, isIn: ['jobSeeker', 'jobPoster'] }
  }, {
    sequelize,
    modelName: 'user'
  })

  return User
}
