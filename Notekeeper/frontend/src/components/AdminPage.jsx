import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Button, Container, Table, Col, Row, Form, Spinner} from "react-bootstrap";
import "../css/admin.css"
import ModalWindow from "./ModalWindow";
import AdminUserEdit from "./AdminUserEdit";

function AdminPage() {

    let navigate = useNavigate();
    //const [loading, setLoading] = useState(true)
    const [load, setLoad] = useState(false)
    const [allUsers, setAllUsers] = useState([]);
    const [filterUsers, setFilterUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [userUsernameFilter, setUserUsernameFilter] = useState("");
    const [userIdFilter, setUserIdFilter] = useState("");
    const [show, setShow] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [currentUser, setCurrentUser] = useState({})
    const showWindow = () => {
        setShow(true)
    }
    const closeWindow = () => {
        getUsers()
        setShow(false)
    }
    const handleClose = () => {
        getUsers()
        setShowDetails(false)
    }
    const handleShow = (user) => {
        setLoad(true)
        setCurrentUser(user)
        setShowDetails(true);
    }

    const changeRole = async (role, id) => {
        try {
            const body = {
                id: Number(id),
                role: role,
            };
            console.log(body)
            let token = JSON.parse(localStorage.getItem("user"));
            await axios.post("http://localhost:8080/api/admin/user/role", body, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
                getUsers()
                showWindow()
            })
        } catch (err) {
            console.error(err.message);
        }
    };

    const getUsers = async () => {
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            await axios.get("http://localhost:8080/api/admin/users", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((response) => {
                setAllUsers(response.data)
                setFilterUsers(response.data)
                //setLoading(false)
            })
        } catch (err) {
            console.error(err.message);
        }
    };

    const getRoles = async () => {
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            await axios.get("http://localhost:8080/api/admin/roles", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((response) => {
                setRoles(response.data)
            })
        } catch (err) {
            console.error(err.message);
        }
    };

    const deleteUser = async (id) => {
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            await axios.delete("http://localhost:8080/api/admin/users/" + id, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((response) => {
                getUsers()
            })
        } catch (err) {
            console.error(err.message);
        }
    };

    function findUser(id, username) {
        id = Number(id)
        console.log(username, id)
        if (username !== "" && id !== 0) {
            setFilterUsers(allUsers.filter(user => user.id === id && user.username === username))
        }
        if (username === "" && id !== 0) {
            setFilterUsers(allUsers.filter(user => user.id === id))
        }
        if (username !== "" && id === 0) {
            setFilterUsers(allUsers.filter(user => user.username === username))
        }
        if (username === "" && id === 0) {
            setFilterUsers(allUsers)
        }
    }

    useEffect(() => {
        getUsers();
        getRoles();
    }, []);

    return (
        <Container>
            <Col xs={12}>
                <h2 className="text-center mt-3">Таблица пользователей администратора</h2>
                <Form>
                    <Row className="align-items-center mb-4">
                        <Col xs="auto" className="mt-4">
                            <Form.Group>
                                <label className="filter-label">Фильтр</label>
                            </Form.Group>
                        </Col>
                        <Col xs="auto" className="mt-4">
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    placeholder="Id рользователя"
                                    required min="0"
                                    onChange={e => {
                                        setUserIdFilter(e.target.value)
                                        findUser(e.target.value, userUsernameFilter)
                                    }}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs="auto" className="mt-4">
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    placeholder="Имя пользователя"
                                    required
                                    onChange={e => {
                                        setUserUsernameFilter(e.target.value)
                                        findUser(userIdFilter, e.target.value)
                                    }}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
                <Table striped responsive bordered hover>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Имя пользователя</th>
                        <th className="select-form">Роль</th>
                        <th colSpan="2">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filterUsers.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td className="select-form">
                                <select className="form-select" defaultValue={user.role} onChange={e => {
                                    console.log(user)
                                    changeRole(e.target.value, user.id)
                                }}>
                                    {roles.map(role => (
                                        <>
                                            {role === user.role ? (
                                                <option value={role}>{role}</option>
                                            ) : (
                                                <option value={role}>{role}</option>)
                                            }</>
                                    ))}
                                </select>
                            </td>
                            <td className="text-center">
                                <Button className="btn btn-secondary"
                                        onClick={() => handleShow(user)}>Профиль</Button>
                            </td>
                            <td className="text-center">
                                <Button className="btn btn-danger"
                                        onClick={() => deleteUser(user.id)}>Удалить</Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Col>
            {load &&
                <AdminUserEdit show={showDetails} action={handleClose}
                               close={handleClose} user={currentUser} roles={roles}/>
            }
                <ModalWindow header="Готово" body="Данные успешно изменены" show={show} action={closeWindow}
                         close={closeWindow}/>

        </Container>
    );
}

export default AdminPage;
