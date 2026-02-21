import { useState } from "react";
import "./Login.css";

function Login(){

const [username,setUsername]=useState("");
const [password,setPassword]=useState("");

const [message,setMessage]=useState("");   // ✅ NEW

const handleLogin=async()=>{

await fetch("http://localhost:8081/api/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({ username,password })

});

// show bubble message
setMessage("Login Failed. Invalid username or password.");


// auto hide after 3 seconds
setTimeout(()=>{
setMessage("");
},3000);

};

return(

<div className="login">

<h2>Secure Bank Login</h2>

<input
placeholder="Username"
onChange={(e)=>setUsername(e.target.value)}
/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button onClick={handleLogin}>
Login
</button>


{/* ✅ Bubble message */}

{message && <div className="bubble">{message}</div>}

</div>

);

}

export default Login;