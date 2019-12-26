var fetch = require('node-fetch');
var redis = require("redis"),
    client = redis.createClient();

const {promisify} = require('util');
const setAsync = promisify(client.set).bind(client);

const URL = "https://jobs.github.com/positions.json";

async function fetchGit() {
    let resultCount = 1, onPage = 0
    const allJobs = []

    while(resultCount > 0) {    
        const res = await fetch(`${URL}?page=${onPage}`);
        const jobs = await res.json();
        allJobs.push(...jobs)
        resultCount = jobs.length
        console.log('got', resultCount, 'jobs');
        onPage++
    }

    console.log(allJobs.length)


    const junJobs = allJobs.filter(job => {
        const jobTitle = job.title.toLowerCase()

        if (
            jobTitle.includes('senior') || 
            jobTitle.includes('manager') ||
            jobTitle.includes('expert') ||
            jobTitle.includes('sr.') || 
            jobTitle.includes('architect')
        ) {
            return false
        } 
        return true 
    })

    console.log('filtered to', junJobs.length)


    const success = await setAsync('github', JSON.stringify(junJobs))

    console.log({success})

}

fetchGit()

module.exports = fetchGit;