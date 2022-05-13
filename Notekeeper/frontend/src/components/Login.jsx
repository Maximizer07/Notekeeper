import React, {useState} from "react";
import axios from "axios";
import {Button, Col, Container, Form, Row, Card} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom"
import validator from "validator"

import "../css/login.css";

function Login() {
    let navigate = useNavigate();
    const [form, setForm] = useState({})
    const [errors, setErrors] = useState({})

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })

        if (!!errors[field]) setErrors({
            ...errors,
            [field]: null
        })
    }

    const findFormErrors = () => {
        const {username, password} = form
        const newErrors = {}

        if (!username || username === '') newErrors.username = 'Пожалуйста введите имя пользователя'
        else if (username.length > 25) newErrors.username = 'Слишком длинное имя пользователя'

        if (!password || password === '') newErrors.password = 'Пожалуйста введите пароль'
        else if (password.length > 25) newErrors.password = 'Слишком длинный пароль'

        return newErrors
    }

    const onSubmitLogin = async e => {
        e.preventDefault()
        const newErrors = findFormErrors()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            const body = {username: form.username, password: form.password};
            console.log(body);
            const response = await axios.post("http://localhost:8080/login", {
                username: body.username,
                password: body.password
            }).catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    // Запрос был сделан, и сервер ответил кодом состояния, который
                    // выходит за пределы 2xx
                    if (error.response.status === 401) {
                        if (error.response.data === 'User does not exist') {
                            newErrors.username = error.response.data
                        } else if (error.response.data === 'Wrong password') {
                            newErrors.password = error.response.data
                        }
                        setErrors(newErrors)
                    }
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            }).then(response => {
                if (response != null) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                    navigate("/profile")
                    //window.location.reload();
                }
            })
        }
    }

    return (
        <section className="position-relative py-4 py-xl-5">
            <Container>
                <Row mb="5">
                    <Col md="8" xl="6" className="text-center mx-auto"><h2>Log in</h2></Col>
                </Row>
                <Row className="d-flex justify-content-center">
                    <Col md="6" xl="4">
                        <Card mb="5">
                            <Card.Body className="d-flex flex-column align-items-center">
                                <div className="bs-icon-xl bs-icon-circle bs-icon-primary bs-icon my-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor"
                                         viewBox="0 0 16 16" className="bi bi-person">
                                        <path
                                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"></path>
                                    </svg>
                                </div>
                                <Form onSubmit={onSubmitLogin} noValidate>
                                    <div className="mb-3">
                                        <Form.Group controlId="username">
                                            <Form.Control
                                                autoFocus
                                                placeholder="Введите имя пользователя"
                                                isInvalid={errors.username}
                                                type="text"
                                                required
                                                onChange={e => setField('username', e.target.value)}/>
                                            <Form.Control.Feedback type='invalid'>
                                                {errors.username}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                    <div className="mb-3">
                                        <Form.Group controlId="password">
                                            <Form.Control
                                                type="password"
                                                placeholder="Введите пароль"
                                                isInvalid={errors.password}
                                                required
                                                onChange={(e) => setField('password', e.target.value)}
                                            />
                                            <Form.Control.Feedback type='invalid'>
                                                {errors.password}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                    <div className="mb-3">
                                        <Button className="btn btn-primary d-block w-100" type="submit">Login</Button>
                                    </div>
                                    <p className="text-muted">Don't have an account?&nbsp;<Link to="/registration">Sign
                                        up</Link></p>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default Login;