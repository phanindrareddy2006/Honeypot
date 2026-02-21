import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Login from "./components/Login";
import Admin from "./components/Admin";
import Dashboard from "./components/Dashboard";

import "./App.css";

function App(){

return(

<BrowserRouter>

<nav>

<Link to="/">Login</Link>

<Link to="/admin">Admin</Link>

<Link to="/dashboard">Dashboard</Link>

</nav>

<Routes>

<Route path="/" element={<Login/>} />

<Route path="/admin" element={<Admin/>} />

<Route path="/dashboard" element={<Dashboard/>} />

</Routes>

</BrowserRouter>

);

}

export default App;