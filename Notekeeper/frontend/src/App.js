import React, {useState} from "react";
import {Container} from "react-bootstrap";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Registration from "./components/Registration"
import Login from "./components/Login"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Home from "./components/Home"
import Profile from "./components/Profile"
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';


function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <div className="App">
                    <Header/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/home" element={<Home/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/registration" element={<Registration/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                    </Routes>
                    <Footer/>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
