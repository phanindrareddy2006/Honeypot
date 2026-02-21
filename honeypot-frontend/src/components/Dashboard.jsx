import { useEffect, useState } from "react";
import "./Dashboard.css";

function Dashboard() {

const [logs, setLogs] = useState([]);

useEffect(() => {

const fetchLogs = () => {

fetch("https://honeypot-2nso.onrender.com/api/attacks")

.then(res => res.json())

.then(data => {

if(Array.isArray(data)){

// show latest attack first
setLogs(data.reverse());

}else{

setLogs([]);

}

})

.catch(()=>setLogs([]));

};


// first load
fetchLogs();


// auto refresh every 3 seconds
const interval = setInterval(fetchLogs, 3000);


// cleanup
return () => clearInterval(interval);


}, []);




const total = logs.length;

const sql = logs.filter(l => l.attackType === "SQL Injection").length;

const normal = logs.filter(l => l.attackType === "Normal").length;



return (

<div className="dashboard">

<h1 className="title">Honeypot Threat Monitor</h1>


<div className="cards">

<div className="card">
<h3>Total Attacks</h3>
<p>{total}</p>
</div>

<div className="card danger">
<h3>SQL Injection</h3>
<p>{sql}</p>
</div>

<div className="card safe">
<h3>Normal Traffic</h3>
<p>{normal}</p>
</div>

</div>



<div className="table-container">

<table>

<thead>

<tr>

<th>IP Address</th>

<th>Port</th>

<th>Attack Type</th>

<th>AI Type</th>

<th>Severity</th>

<th>Risk Score</th>

<th>AI Description</th>

<th>Security Recommendation</th>

<th>Time</th>

</tr>

</thead>



<tbody>

{logs.map(log => (

<tr key={log.id}>

<td>{log.ip}</td>

<td>{log.port}</td>


<td className={
log.attackType === "SQL Injection"
? "danger-text"
: "safe-text"
}>

{log.attackType}

</td>



<td>{log.aiAttackType}</td>



<td className={

log.aiSeverity === "Critical" ? "critical" :

log.aiSeverity === "High" ? "high" :

log.aiSeverity === "Medium" ? "medium" :

"low"

}>

{log.aiSeverity}

</td>




<td>

{log.aiRiskScore}/100

</td>



<td>{log.aiDescription}</td>

<td>{log.aiSolution}</td>

<td>{log.timestamp}</td>


</tr>

))}

</tbody>

</table>

</div>

</div>

);

}

export default Dashboard;
