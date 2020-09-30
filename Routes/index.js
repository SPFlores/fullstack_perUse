module.exports = app => {
  require('./applyRoutes.js')(app)
  require('./jobRoutes.js')(app)
  require('./userRoutes.js')(app)
  require('./locationRoutes.js')(app)
}
