import React, {useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Registration from "./components/Registration"
import Login from "./components/Login"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Home from "./components/Home"
import Profile from "./components/Profile"

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Templates from "./components/Templates";

function App() {
    const [auth, setAuth] = useState(false)
    const changeAuth = (auth) => {
        setAuth(auth)
    }

    return (
        <div className="App">
            <BrowserRouter>
                <div className="App">
                    <Header auth={auth} changeAuth={changeAuth}/>
                    <Routes>
                        <Route path="/logout" element={<Home changeAuth={changeAuth}/>}/>
                        <Route path="/home" element={<Home changeAuth={changeAuth}/>}/>
                        <Route path="/note" element={<Templates/>}/>
                        <Route path="/login" element={<Login changeAuth={changeAuth}/>}/>
                        <Route path="/registration" element={<Registration changeAuth={changeAuth}/>}/>
                        <Route path="/profile" element={<Profile changeAuth={changeAuth}/>}/>
                    </Routes>
                    <Footer auth={auth} changeAuth={changeAuth}/>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
