import {Link, NavLink, useNavigate, useParams} from "react-router-dom";
import '../css/header.css';
import {Button, Container, Nav, Navbar, Spinner} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import React from "react";
import ModalWindow from "./ModalWindow";

const Header = (props) => {
    const changeAuth = props.changeAuth
    const changeAdmin = props.changeAdmin
    let navigate = useNavigate();
    const [loading, setLoading] = useState(true)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getUser = async () => {
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            if (token != null) {
                await axios.get("http://localhost:8080/api/user/profile", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).catch(function (error) {
                    console.log(error)
                    if (error.response.data.startsWith("Unknown user")){
                        console.log(error)
                    }
                    setLoading(false)
                }).then((response) => {
                    if (response.data.role.includes('ROLE_ADMIN'))
                        changeAdmin(true)
                    changeAuth(true)
                    setLoading(false)
                })
                console.log(token)
            } else
                setLoading(false)
        } catch (err) {
            console.error(err.message);
        }
    };

    const logoutFunc = () => {
        try {
            localStorage.removeItem("user")
            changeAuth(false);
            changeAdmin(false);
            axios.get("http://localhost:8080/logout")
            handleShow()
            navigate("/home");
            console.log("redirect home")
        } catch (err) {
            console.error(err.message)
        }
    };
    useEffect(() => {
        getUser();
    }, []);
    return (
        <Navbar bg="light" expand="lg" className="header">
            {loading ? <Spinner animation="grow" variant="light" style={{width: '200', height: '200'}}/> :
                <Container fluid>
                    <Navbar.Brand>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="mb-1 bi bi-pencil-square" viewBox="0 0 16 16">
                            <path
                                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fillRule="evenodd"
                                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                        &nbsp;Notekeeper
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll"/>
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{maxHeight: '10em'}}
                        >
                            <Nav.Link as={NavLink} to="/home">Home</Nav.Link>
                            {props.auth &&
                                <Nav.Link as={NavLink} to="/notes">Notes</Nav.Link>
                                &&
                                <Nav.Link as={NavLink} to="/profile">Profile</Nav.Link>
                            }
                            {props.isAdmin &&
                                <Nav.Link as={NavLink} to="/admin">Admin</Nav.Link>
                            }
                        </Nav>
                        {props.auth ? (
                            <Button variant="outline-danger" onClick={logoutFunc}>Logout</Button>
                        ) : (
                            <Link to="/login">
                                <Button variant="outline-success">Login</Button>
                            </Link>
                        )}
                    </Navbar.Collapse>
                </Container>
            }
            <ModalWindow header="Готово" body="Вы успешно вышли из аккаунта" show={show} action={handleClose}
                         close={handleClose}/>
        </Navbar>

    );
}
export default Header;