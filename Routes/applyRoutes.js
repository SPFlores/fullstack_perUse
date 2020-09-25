const { Application } = require('../models')

module.exports = app => {
  // must be logged in, will validate using localstorage isLoggedIn boolean OR token if some type of auth is implemented down the line
  app.post('/applications', (req, res) => {
    Application.create(req.body)
      .then(_ => {
        res.sendStatus(200)
      })
      .catch(e => console.log(e))
  })
}
