const { Location } = require('../models')

module.exports = app => {
  app.get('/locations', (req, res) => {
    Location.findAll()
      .then(locations => res.json(locations))
      .catch(e => console.log(e))
  })
}
