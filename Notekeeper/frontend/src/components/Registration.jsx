import React, {useState} from "react";
import axios from "axios";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom"
import validator from "validator"

import "../css/registration.css";

function Registration() {
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
        const {username, email, name, password, passwordConfirm} = form
        const newErrors = {}

        if (!username || username === '') newErrors.name = 'Пожалуйста введите имя пользователя'
        else if (username.length < 5) newErrors.name = 'Длина имени пользователя должна быть не менее 5 символов'
        else if (username.length > 15) newErrors.name = 'Длина имени пользователя должна быть не более 15 символов'

        if (!email || email === '') newErrors.name = 'Пожалуйста введите почту'
        else if (!validator.isEmail(email)) newErrors.email = 'Не корректная запись почты'


        if (!password || password === '' || password.length < 8) newErrors.password = 'Длина пароля должна быть не менее 8 символов'
        else if (password.length > 25) newErrors.password = 'Слишком длинный пароль'

        if (passwordConfirm !== password) newErrors.passwordConfirm = 'Пароли не совпадают'

        if (!name || name === '') newErrors.firstName = 'Пожалуйста введите имя пользователя'

        return newErrors
    }

    const onSubmitSignUp = async e => {
        e.preventDefault()
        const newErrors = findFormErrors()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            try {
                const body = {
                    username: form.username,
                    email: form.email,
                    name: form.name,
                    password: form.password,
                };
                console.log(body);
                await axios.post("http://localhost:8080/signup", body, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

            } catch (err) {
                console.error(err.message)
            }
        }
    }

    return (
        <Container>
            <Row>
                <Col md="4">
                    <h1>Sign up</h1>
                    <Form onSubmit={onSubmitSignUp} noValidate>
                        <Form.Group size="lg" controlId="username">
                            <Form.Label>Имя пользователя</Form.Label>
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
                        <Form.Group size="lg" controlId="name">
                            <Form.Label>Имя</Form.Label>
                            <Form.Control
                                placeholder="Введите ваше имя"
                                isInvalid={errors.name}
                                type="text"
                                required
                                onChange={e => setField('name', e.target.value)}/>

                            <Form.Control.Feedback type='invalid'>
                                {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group size="lg" controlId="email">
                            <Form.Label>Почта</Form.Label>
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
                        <Form.Group size="lg" controlId="password">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control
                                placeholder="Введите пароль"
                                isInvalid={errors.password}
                                type="password"
                                onChange={e => setField('password', e.target.value)}/>

                            <Form.Control.Feedback type='invalid'>
                                {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group size="lg">
                            <Form.Label>Повторите пароль</Form.Label>
                            <Form.Control
                                placeholder="Повторите пароль"
                                id="passwordConfirm"
                                isInvalid={errors.passwordConfirm}
                                type="password"
                                onChange={e => setField('passwordConfirm', e.target.value)}/>

                            <Form.Control.Feedback type='invalid'>
                                {errors.passwordConfirm}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button block size="lg" type="submit">
                            Войти
                        </Button>
                    </Form>
                    <Link to="/login" className=" text-center"> Войти</Link>
                </Col>
            </Row>
        </Container>
    );
}

export default Registration;