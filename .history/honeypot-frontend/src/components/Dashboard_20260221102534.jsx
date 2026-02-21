import {useState,useEffect} from "react";
import "./Dashboard.css";

function Dashboard(){

const [logs,setLogs]=useState([]);

useEffect(()=>{

fetch("http://localhost:8080/api/attacks")

.then(res=>res.json())

.then(data=>setLogs(data));

},[]);

return(

<div>

<h2>Attack Logs</h2>

<table>

<tr>
<th>IP</th>
<th>Attack</th>
</tr>

{
logs.map(log=>(

<tr key={log.id}>
<td>{log.ip}</td>
<td>{log.attackType}</td>
</tr>

))
}

</table>

</div>

);

}

export default Dashboard;