const Sequelize = require('sequelize')
const sequelize = require('../config')

let User = require('./users.js')(sequelize, Sequelize)
let Job = require('./jobs.js')(sequelize, Sequelize)
let Location = require('./locations.js')(sequelize, Sequelize)
let TypeofJob = require('./types.js')(sequelize, Sequelize)
let Skill = require('./skills.js')(sequelize, Sequelize)
let Application = require('./applications.js')(sequelize, Sequelize)

Location.hasMany(Job)
Job.belongsTo(Location)
Job.belongsToMany(Skill, { through: 'job2skill', as: 'skills', foreignKey: 'job_id' })
Skill.belongsToMany(Job, { through: 'job2skill', as: 'jobs', foreignKey: 'skill_id' })
TypeofJob.hasMany(Job)
Job.belongsTo(TypeofJob)
Job.hasMany(Application)
Application.belongsTo(Job)
User.hasMany(Application)
Application.belongsTo(User)

module.exports = { User, Job, Location, TypeofJob, Skill, Application }
