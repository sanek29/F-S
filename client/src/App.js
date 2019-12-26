import React from 'react';
import './App.css';

import Jobs from "./Jobs"
import fetch from 'node-fetch';

const Job_URL = "http://localhost:3001/jobs"

async function fetchJobs(update) {
  const res = await fetch(Job_URL)
  const json = await res.json()

  update(json)
}

function App() {

  const [jobList, updateJobs] = React.useState([])

  React.useEffect(() => {
    fetchJobs(updateJobs)
  }, [])

  return (
    <div className="App">
      <Jobs jobs={jobList}/>
      
    </div>
  );
}

export default App;
