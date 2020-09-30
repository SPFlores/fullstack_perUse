const { Job, Skill, TypeofJob, Location } = require('../models')

module.exports = app => {
  app.get('/jobs', (req, res) => {
    Job.findAll({ include: [TypeofJob, Skill, Location] })
      .then(jobs => res.json(jobs))
      .catch(e => console.log(e))
  })

  app.get('./jobs/:id', (req, res) => {
    Job.findOne({ where: { id: req.params.id } })
      .then(job => res.json(job))
      .catch(e => console.log(e))
  })

  // must be logged in and be job poster, will validate using localstorage isLoggedIn boolean and some type of userType localStorage item OR token if some type of auth is implemented down the line
  app.post('/jobs', (req, res) => {
    Job.create(req.body)
      .then(_ => {
        res.sendStatus(200)
      })
      .catch(e => console.log(e))
  })

  // must be logged in, will validate using localstorage isLoggedIn boolean OR token if some type of auth is implemented down the line
  app.put('/jobs', (req, res) => {
    Job.update(req.body, { where: { id: req.params.id } })
      .then(_ => res.sendStatus(200))
      .catch(e => console.log(e))
  })

  // must be logged in, will validate using localstorage isLoggedIn boolean OR token if some type of auth is implemented down the line
  app.delete('./jobs/:id', (req, res) => {
    Job.destroy({ where: { id: req.params.id } })
      .then(_ => res.sendStatus(200))
      .catch(e => console.log(e))
  })
}
