const { Skill } = require('../models')

module.exports = app => {
  app.get('/skills', (req, res) => {
    Skill.findAll()
      .then(skills => res.json(skills))
      .catch(e => console.log(e))
  })
}
