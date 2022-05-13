import React, {useState} from "react";
import {Container} from "react-bootstrap";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Registration from "./components/Registration"
import Login from "./components/Login"
import Footer from "./components/Footer"
import Header from "./components/Header"
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';


function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <div className="App">
                    <Header/>
                    <Routes>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/registration" element={<Registration/>}/>
                    </Routes>
                    <Footer/>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
