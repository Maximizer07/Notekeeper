import React, {useState} from "react";
import { Container } from "react-bootstrap";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Registration from "./components/Registration"
import Login from "./components/Login"
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';


function App() {

    return (
        <div className="App">
            <Container>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/registration" element={<Registration/>}/>
                </Routes>
            </BrowserRouter>
            </Container>
        </div>
    );
}

export default App;
