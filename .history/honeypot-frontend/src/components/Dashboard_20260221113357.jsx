import { useEffect, useState } from "react";
import "./Dashboard.css";

function Dashboard() {

const [logs, setLogs] = useState([]);

useEffect(() => {

fetch("http://localhost:8081/api/attacks")   // ✅ CHANGED 8080 → 8081

.then(res => res.json())

.then(data => setLogs(data));

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

<th>Time</th>

</tr>

</thead>

<tbody>

{logs.map(log => (

<tr key={log.id}>

<td>{log.ip}</td>

<td>{log.port}</td>

<td className={log.attackType === "SQL Injection" ? "danger-text" : "safe-text"}>

{log.attackType}

</td>

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