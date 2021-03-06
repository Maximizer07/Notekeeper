import React, {useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Registration from "./components/Registration"
import Login from "./components/Login"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Home from "./components/Home"
import Profile from "./components/Profile"
import AdminPage from "./components/AdminPage";

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Notes from "./components/Notes";



function App() {
    const [auth, setAuth] = useState(false)
    const changeAuth = (auth) => {
        setAuth(auth)
    }
    const [isAdmin, setIsAdmin] = useState(false)
    const changeAdmin = (admin) => {
        setIsAdmin(admin)
    }

    return (
        <div className="App">
            <BrowserRouter>
                <div className="App">
                    <Header auth={auth} isAdmin={isAdmin} changeAdmin={changeAdmin} changeAuth={changeAuth}/>
                    <Routes>
                        <Route path="/logout" element={<Home changeAuth={changeAuth}/>}/>
                        <Route path="/home" element={<Home changeAuth={changeAuth}/>}/>
                        <Route path="/login" element={<Login changeAuth={changeAuth}/>}/>
                        <Route path="/admin" element={<AdminPage/>}/>
                        <Route path="/registration" element={<Registration changeAuth={changeAuth}/>}/>
                        <Route path="/profile" element={<Profile changeAuth={changeAuth} changeAdmin={changeAdmin}/>}/>
                        <Route path="/notes" element={<Notes/>}/>
                        <Route path="/" element={<Home changeAuth={changeAuth}/>}/>
                    </Routes>
                    <Footer auth={auth} changeAuth={changeAuth}/>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
