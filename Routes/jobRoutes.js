const { Job, Skill, TypeofJob } = require('../models')

module.exports = app => {
  app.get('/jobs', (req, res) => {
    Job.findAll({ include: [TypeofJob, Skill] })
      .then(jobs => res.json(jobs))
      .catch(e => console.log(e))
  })

  app.get('./jobs/:id', (req, res) => {
    Job.findOne({ where: { id: req.params.id } })
      .then(job => res.json(job))
      .catch(e => console.log(e))
  })

  app.post('/jobs', (req, res) => {
    Job.create(req.body)
      .then(_ => {
        res.sendStatus(200)
      })
      .catch(e => console.log(e))
  })

  app.put('/jobs', (req, res) => {
    Job.update(req.body, { where: { id: req.params.id } })
      .then(_ => res.sendStatus(200))
      .catch(e => console.log(e))
  })

  app.delete('./jobs/:id', (req, res) => {
    Job.destroy({ where: { id: req.params.id } })
      .then(_ => res.sendStatus(200))
      .catch(e => console.log(e))
  })
}
