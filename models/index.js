const Sequelize = require('sequelize')
const sequelize = require('../config')

let User = require('./users.js')(sequelize, Sequelize)
let Job = require('./jobs.js')(sequelize, Sequelize)
let Location = require('./locations.js')(sequelize, Sequelize)
let TypeofJob = require('./types.js')(sequelize, Sequelize)
let Skill = require('./skills.js')(sequelize, Sequelize)

Location.hasMany(Job)
Job.belongsTo(Location)
Job.hasMany(Skill)
Skill.belongsTo(Job)
Job.hasMany(TypeofJob)
TypeofJob.belongsTo(Job)

module.exports = { User, Job, Location, TypeofJob, Skill }
