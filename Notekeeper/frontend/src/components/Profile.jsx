import {Button, Card, Col, Container, Form, Modal, Row, Spinner} from "react-bootstrap";
import {Link} from "react-router-dom";
import "../css/profile.css";
import Home from "./Home";
import axios from "axios";
import {useEffect, useState} from "react";
import validator from "validator";
import {useNavigate} from "react-router-dom";
import React from "react";

function Profile() {
    const [loading, setLoading] = useState(true)
    const [form, setForm] = useState({})
    const [formPass, setFormPass] = useState({})
    const [errors, setErrors] = useState({})
    const [disabled, setDisabled] = useState(true);
    const [show, setShow] = useState(false);

    const handleClose = () => {
        window.location.reload();
    }
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

    const setFieldPass = (field, value) => {
        setFormPass({
            ...formPass,
            [field]: value
        })
        if (!!errors[field]) setErrors({
            ...errors,
            [field]: null
        })
    }

    const handleClick = (e) => {
        e.preventDefault();
        setDisabled(!disabled);
    };

    let navigate = useNavigate();

    const handleSubmit = async e => {
        if (disabled !== true) {
            e.preventDefault()
            const newErrors = findFormErrorsProfile()
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors)
            } else {
                console.log("tyta")
                const body = {
                    username: form.formUsername,
                    email: form.formEmail,
                    name: form.formName,
                    id: form.formId,
                    role: form.formRole
                };
                console.log(body);
                let token = JSON.parse(localStorage.getItem("user"));
                const response = await axios.post("http://localhost:8080/api/user/profile", body, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }).catch(function (error) {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        if (error.response.status === 409) {
                            if (error.response.data === 'Not unique email') {
                                newErrors.formEmail = error.response.data
                            }
                            setErrors(newErrors)
                        }
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
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
                    if (response != null) handleShow();
                })
            }
        }
    }

    const handleSubmitPass = async e => {
        e.preventDefault()
        const newErrors = findFormErrorsPass()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            const body = {
                username: form.formUsername,
                password: formPass.formPassword,
                newPassword: formPass.formNewPassword
            };
            console.log(body);
            let token = JSON.parse(localStorage.getItem("user"));
            const response = await axios.post("http://localhost:8080/api/user/changepass", body, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }).catch(function (error) {
                if (error.response) {
                    if (error.response.status === 409) {
                        if (error.response.data === 'Wrong password') {
                            newErrors.formPassword = error.response.data
                        }
                        setErrors(newErrors)
                    }
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
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
                if (response != null) handleShow();
            })
        }
    }

    const findFormErrorsProfile = () => {

        const {formUsername, formEmail, formName, formRole} = form
        console.log(form)
        const newErrors = {}

        //if (!username || username === '') newErrors.username = 'Пожалуйста введите имя пользователя'
        //else if (username.length < 5) newErrors.username = 'Длина имени пользователя должна быть не менее 5 символов'
        //else if (username.length > 15) newErrors.username = 'Длина имени пользователя должна быть не более 15 символов'

        if (!formEmail || formEmail === '') newErrors.formEmail = 'Пожалуйста введите почту'
        else if (!validator.isEmail(formEmail)) newErrors.formEmail = 'Не корректная запись почты'

        if (!formName || formName === '') newErrors.formName = 'Пожалуйста введите имя пользователя'

        return newErrors
    }

    const findFormErrorsPass = () => {

        const {formPassword, formNewPassword} = formPass
        console.log(formPass)
        const newErrors = {}

        if (!formPassword || formPassword === '' || formPassword.length < 8) newErrors.formPassword = 'Длина пароля должна быть не менее 8 символов'
        else if (formPass.length > 25) newErrors.formPass = 'Слишком длинный пароль'

        if (!formNewPassword || formNewPassword === '' || formNewPassword.length < 8) newErrors.formNewPassword = 'Длина пароля должна быть не менее 8 символов'
        else if (formNewPassword.length > 25) newErrors.formNewPassword = 'Слишком длинный пароль'

        return newErrors
    }

    const getUser = async () => {
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            await axios.get("http://localhost:8080/api/user/profile", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((response) => {
                console.log(response.data)
                setForm({
                    formUsername: response.data.username,
                    formEmail: response.data.email,
                    formName: response.data.name,
                    formRole: response.data.role,
                    formId: response.data.id
                })
                console.log(form)
                setLoading(false)
            })
        } catch (err) {
            console.error(err.message);
        }
    };
    useEffect(() => {
        getUser();
    }, []);
    return (
        <Container className="profile">
            {loading ? <Spinner animation="border" style={{width: '200', height: '200'}}/> :
                <Row className="gutters">
                    <Col xl="3" lg="3" md="12" sm="12" col="12">
                        <Card h="100">
                            <Card.Body>
                                <div className="account-settings">
                                    <div className="user-profile">
                                        <div className="user-avatar">
                                            <img src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                                 alt="User"/>
                                        </div>
                                        <h5 className="user-name">{form.formUsername}</h5>
                                        <h6 className="user-email">{form.formEmail}</h6>
                                    </div>
                                    <div className="about">
                                        <h5>Role</h5>
                                        <p>{form.formRole}</p>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl="9" lg="9" md="12" sm="12" col="12">
                        <Card h="100">
                            <Card.Body>
                                <Col className="text-center">
                                    <h6 className="mb-2 text-primary">Personal Details</h6>
                                </Col>
                                <Form onSubmit={handleSubmit} noValidate>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="username">
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control type="text" placeholder="Enter username"
                                                          defaultValue={form.formUsername}
                                                          disabled={true}/>
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="name">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Name"
                                                          defaultValue={form.formName}
                                                          isInvalid={errors.formName} disabled={disabled}
                                                          onChange={e => {
                                                              setField('formName', e.target.value)
                                                          }}/>
                                            <Form.Control.Feedback
                                                type='invalid'>{errors.formName}</Form.Control.Feedback>
                                        </Form.Group>

                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="email">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" placeholder="Enter email"
                                                          defaultValue={form.formEmail}
                                                          isInvalid={errors.formEmail} disabled={disabled}
                                                          onChange={e => {
                                                              setField('formEmail', e.target.value)
                                                          }}/>
                                            <Form.Control.Feedback
                                                type='invalid'>{errors.formEmail}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                    <Button variant="info" onClick={handleClick}>
                                        Edit
                                    </Button>
                                    <Button className="ms-3" variant="primary" disabled={disabled} type="submit">
                                        Submit
                                    </Button>
                                </Form>
                                <Col className="mt-5 text-center">
                                    <h6 className="mb-2 text-primary">Change Password</h6>
                                </Col>
                                <Form onSubmit={handleSubmitPass} noValidate>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="formPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" placeholder="Enter password"
                                                          isInvalid={errors.formPassword} onChange={e => {
                                                setFieldPass('formPassword', e.target.value)
                                            }}/>
                                            <Form.Control.Feedback
                                                type='invalid'>{errors.formPassword}</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="formNewPassword">
                                            <Form.Label>Password Confirm</Form.Label>
                                            <Form.Control type="password" placeholder="Repeat password"
                                                          isInvalid={errors.formNewPassword} onChange={e => {
                                                setFieldPass('formNewPassword', e.target.value)
                                            }}/>
                                            <Form.Control.Feedback
                                                type='invalid'>{errors.formNewPassword}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                    <Button variant="primary" type="submit">
                                        Change Password
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            }
            <Modal show={show}>
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title>Готово</Modal.Title>
                </Modal.Header>
                <Modal.Body>Данные успешно изменены</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default Profile;