const { Job, Skill, TypeofJob, Location } = require('../models')
const skill = { model: Skill, as: 'skills' }

module.exports = app => {
  app.get('/jobs', (req, res) => {
    Job.findAll({ include: [TypeofJob, skill, Location] })
      .then(jobs => res.json(jobs))
      .catch(e => console.log(e))
  })

  app.get('/jobs/:id', (req, res) => {
    Job.findOne({ where: { id: req.params.id }, include: [skill] })
      .then(job => res.json(job))
      .catch(e => console.log(e))
  })

  app.get('/jobs/location/:id', (req, res) => {
    Job.findAll({ where: { locationId: req.params.id }, include: [TypeofJob, skill, Location] })
      .then(jobs => res.json(jobs))
      .catch(e => console.log(e))
  })

  app.get('/jobs/type/:id', (req, res) => {
    Job.findAll({ where: { typeofjobId: req.params.id }, include: [TypeofJob, skill, Location] })
      .then(jobs => res.json(jobs))
      .catch(e => console.log(e))
  })

  app.get('/jobs/skill/:id', (req, res) => {
    Job.findAll({
      include: [TypeofJob, skill, Location],
      where: { '$skills.id$': req.params.id },
    })
      .then(jobs => res.json(jobs))
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
