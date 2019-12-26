var express = require('express');
var app = express();

var redis = require("redis"),
    client = redis.createClient();

const {promisify} = require('util');
const getAsync = promisify(client.get).bind(client);

app.get('/jobs', async (req, res) => {

    const jobs = await getAsync('github')
    console.log(JSON.parse(jobs).length) 
    res.header("Access-Control-Allow-Origin", "http://localhost:3000")
  return res.send(jobs);
});

app.listen(3001, () => {
  console.log('Example app listening on port 3001!');
});