const { User } = require('../models')
const Op = require('sequelize')

module.exports = app => {
  app.get('/users', (req, res) => {
    User.findAll()
      .then(users => res.json(users))
      .catch(e => console.log(e))
  })

  app.get('./users/:id', (req, res) => {
    User.findOne({ where: { id: req.params.id } })
      .then(user => res.json(user))
      .catch(e => console.log(e))
  })

  app.get('/login', (req, res) => {
    User.findOne({
      where: {
        [Op.and]: [{ email: req.body.email }, { password: req.body.password }]
      }
    })
      .then(user => {
        if (user) {
          console.log('login success')
          res.sendStatus(200)
        } else {
          console.log('login failed')
        }
      })
      .catch(e => console.log(e))
  })

  app.post('/register', (req, res) => {
    User.create(req.body)
      .then(_ => {
        res.sendStatus(200)
      })
      .catch(e => console.log(e))
  })

  app.put('/users', (req, res) => {
    User.update(req.body, { where: { id: req.params.id } })
      .then(_ => res.sendStatus(200))
      .catch(e => console.log(e))
  })

  app.delete('./users/:id', (req, res) => {
    User.destroy({ where: { id: req.params.id } })
      .then(_ => res.sendStatus(200))
      .catch(e => console.log(e))
  })
}
