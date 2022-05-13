import React, {useState} from "react";
import axios from "axios";
import {Button, Card, Col, Container, Form, Row, Modal} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom"
import validator from "validator"

import "../css/login.css";

function Registration() {
    let navigate = useNavigate();
    const [form, setForm] = useState({})
    const [errors, setErrors] = useState({})
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
        const {username, email, name, password, newPassword} = form
        const newErrors = {}

        if (!username || username === '') newErrors.username = 'Пожалуйста введите имя пользователя'
        else if (username.length < 5) newErrors.username = 'Длина имени пользователя должна быть не менее 5 символов'
        else if (username.length > 15) newErrors.username = 'Длина имени пользователя должна быть не более 15 символов'

        if (!email || email === '') newErrors.email = 'Пожалуйста введите почту'
        else if (!validator.isEmail(email)) newErrors.email = 'Не корректная запись почты'


        if (!password || password === '' || password.length < 8) newErrors.password = 'Длина пароля должна быть не менее 8 символов'
        else if (password.length > 25) newErrors.password = 'Слишком длинный пароль'

        if (newPassword !== password) newErrors.newPassword = 'Пароли не совпадают'

        if (!name || name === '') newErrors.name = 'Пожалуйста введите имя пользователя'

        return newErrors
    }

    const onSubmitSignUp = async e => {
        e.preventDefault()
        const newErrors = findFormErrors()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            const body = {
                username: form.username,
                email: form.email,
                name: form.name,
                password: form.password,
            };
            console.log(body);
            const response = await axios.post("http://localhost:8080/signup", body, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    // Запрос был сделан, и сервер ответил кодом состояния, который
                    // выходит за пределы 2xx
                    if (error.response.status === 409) {
                        if (error.response.data === 'Not unique username') {
                            newErrors.username = error.response.data
                        } else if (error.response.data === 'Not unique email') {
                            newErrors.email = error.response.data
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
                if (response!= null) handleShow();
            })
        }
    }


    function successRegModal() {
        navigate("/login")
    }

    return (
        <section className="position-relative py-4 py-xl-5">
            <Container>
                <Row mb="5">
                    <Col md="8" xl="6" className="text-center mx-auto"><h2>Sign up</h2></Col>
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
                                <Form onSubmit={onSubmitSignUp} noValidate>
                                    <div className="mb-3">
                                        <Form.Group size="lg" controlId="username">
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
                                        <Form.Group size="lg" controlId="name">
                                            <Form.Control
                                                placeholder="Введите имя"
                                                isInvalid={errors.name}
                                                type="text"
                                                required
                                                onChange={e => setField('name', e.target.value)}/>

                                            <Form.Control.Feedback type='invalid'>
                                                {errors.name}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                    <div className="mb-3">
                                        <Form.Group size="lg" controlId="email">
                                            <Form.Control
                                                placeholder="Введите почту"
                                                isInvalid={errors.email}
                                                type="email"
                                                required
                                                onChange={e => setField('email', e.target.value)}/>

                                            <Form.Control.Feedback type='invalid'>
                                                {errors.email}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                    <div className="mb-3">
                                        <Form.Group size="lg" controlId="password">
                                            <Form.Control
                                                placeholder="Введите пароль"
                                                isInvalid={errors.password}
                                                type="password"
                                                onChange={e => setField('password', e.target.value)}/>

                                            <Form.Control.Feedback type='invalid'>
                                                {errors.password}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                    <div className="mb-3">
                                        <Form.Group size="lg">
                                            <Form.Control
                                                placeholder="Повторите пароль"
                                                id="newPassword"
                                                isInvalid={errors.newPassword}
                                                type="password"
                                                onChange={e => setField('newPassword', e.target.value)}/>

                                            <Form.Control.Feedback type='invalid'>
                                                {errors.newPassword}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                    <div className="mb-3">
                                        <Button className="btn btn-primary d-block w-100" type="submit">Sign up</Button>
                                    </div>
                                    <p className="text-muted">Already have an account?&nbsp;<Link to="/login">Log
                                        in</Link></p>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Modal show={show}>
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title>Успешная регистрация</Modal.Title>
                </Modal.Header>
                <Modal.Body>Теперь можете переходить к входу</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={successRegModal}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
        </section>
    );
}

export default Registration;