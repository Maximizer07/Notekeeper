import React, {useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Registration from "./components/Registration"
import Login from "./components/Login"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Home from "./components/Home"
import Profile from "./components/Profile"
import AdminPage from "./components/AdminPage";
import UserInfo from "./components/UserInfo";

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';



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
                        <Route path="/login" element={<Login changeAuth={changeAuth}/>}/>
                        <Route path="/admin" element={<AdminPage/>}/>
                        <Route path="/admin/users/:id" element={<UserInfo/>}/>
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
