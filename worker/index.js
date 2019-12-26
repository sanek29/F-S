var CronJob = require('cron').CronJob;

const fetchGit = require('./fetchGit')


new CronJob('* * * * *', fetchGit(), null, true, 'America/Los_Angeles');