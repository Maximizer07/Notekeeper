import {Button, Col, Form, Modal, Row, Card, Spinner} from "react-bootstrap";
import React, {useState, useEffect} from "react";
import axios from "axios";
import validator from "validator";

function AdminUserEdit(props) {
    let show = props.show
    const close = props.close
    const user = props.user
    const roles = props.roles
    const [loading, setLoading] = useState(true)
    const [form, setForm] = useState({
        formUsername: user.username,
        formName: user.name,
        formEmail: user.email,
        formRole: user.role,

    })
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

    const handleSubmit = async e => {
        e.preventDefault()
        const newErrors = findFormErrorsProfile()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            const body = {
                username: form.formUsername,
                email: form.formEmail,
                name: form.formName,
                role: form.formRole
            };
            console.log(body);
            let token = JSON.parse(localStorage.getItem("user"));
            await axios.put("http://localhost:8080/api/admin/users/" + user.id, body, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }).catch(function (error) {
                if (error.response) {
                    if (error.response.status === 409) {
                        if (error.response.data === 'Not unique email') {
                            newErrors.formEmail = error.response.data
                        }
                        if (error.response.data === 'Not unique username') {
                            newErrors.formUsername = error.response.data
                        }
                        setErrors(newErrors)
                    }
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            }).then(response => {

            })
            close();
        }
    }

    const findFormErrorsProfile = () => {

        const {formUsername, formEmail, formName, formRole} = form
        console.log(form)
        const newErrors = {}

        if (!formUsername || formUsername === '') newErrors.formUsername = 'Пожалуйста введите имя пользователя'
        else if (formUsername.length < 5) newErrors.formUsername = 'Длина имени пользователя должна быть не менее 5 символов'
        else if (formUsername.length > 15) newErrors.formUsername = 'Длина имени пользователя должна быть не более 15 символов'

        if (!formEmail || formEmail === '') newErrors.formEmail = 'Пожалуйста введите почту'
        else if (!validator.isEmail(formEmail)) newErrors.formEmail = 'Не корректная запись почты'

        if (!formName || formName === '') newErrors.formName = 'Пожалуйста введите имя пользователя'

        return newErrors
    }

    return (
        <Modal show={show}>
            <Form onSubmit={handleSubmit} noValidate>
                <Modal.Header closeButton onClick={close}>
                    <Modal.Title>User Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Form.Group as={Col} className="mb-2" controlId="id">
                                    <Form.Label className="font-weight-bold">Id</Form.Label>
                                    <Form.Control disabled={true} type="text"
                                                  defaultValue={user.id}/>
                                </Form.Group>
                                <Form.Group as={Col} className="mb-2" controlId="username">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Enter username"
                                                  defaultValue={user.username}
                                                  isInvalid={errors.formUsername}
                                                  onChange={e => {
                                                      setField('formUsername', e.target.value)
                                                  }}/>
                                    <Form.Control.Feedback
                                        type='invalid'>{errors.formUsername}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} className="mb-2" controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Name"
                                                  defaultValue={user.name}
                                                  isInvalid={errors.formName}
                                                  onChange={e => {
                                                      setField('formName', e.target.value)
                                                  }}/>
                                    <Form.Control.Feedback
                                        type='invalid'>{errors.formName}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} className="mb-2" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email"
                                                  defaultValue={user.email}
                                                  isInvalid={errors.formEmail}
                                                  onChange={e => {
                                                      setField('formEmail', e.target.value)
                                                  }}/>
                                    <Form.Control.Feedback
                                        type='invalid'>{errors.formEmail}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} className="mb-2" controlId="role">
                                    <Form.Label>Role</Form.Label>
                                    <Form.Select defaultValue={user.role} onChange={e => {
                                        setField('formRole', e.target.value)
                                    }}>
                                        {roles.map(role => (
                                            <>
                                                {role === user.role ? (
                                                    <option value={role}>{role}</option>
                                                ) : (
                                                    <option value={role}>{role}</option>)
                                                }</>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Col>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="success">
                        Изменить
                    </Button>
                    <Button onClick={close} variant="secondary">
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AdminUserEdit;