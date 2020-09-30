const { TypeofJob } = require('../models')

module.exports = app => {
  app.get('/types', (req, res) => {
    TypeofJob.findAll()
      .then(types => res.json(types))
      .catch(e => console.log(e))
  })
}
