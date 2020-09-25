const { Application } = require('../models')

module.exports = app => {
  app.post('/applications', (req, res) => {
    Application.create(req.body)
      .then(_ => {
        res.sendStatus(200)
      })
      .catch(e => console.log(e))
  })
}
