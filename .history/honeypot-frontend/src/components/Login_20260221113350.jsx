import { useState } from "react";
import "./Login.css";

function Login(){

const [username,setUsername]=useState("");
const [password,setPassword]=useState("");

const handleLogin=async()=>{

await fetch("http://localhost:8081/api/login",{   // ✅ CHANGED 8080 → 8081

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({ username,password })

});

alert("Login Failed");

};

return(

<div className="login">

<h2>Secure Bank Login</h2>

<input placeholder="Username"
onChange={(e)=>setUsername(e.target.value)}
/>

<input type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button onClick={handleLogin}>
Login
</button>

</div>

);

}

export default Login;