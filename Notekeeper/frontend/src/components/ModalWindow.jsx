import {Button, Modal} from "react-bootstrap";
import React, {useState} from "react";

function Profile(props) {
    const [header, body] = [props.header, props.body]
    let show = props.show
    const action = props.action
    const close = props.close

    return (
    <Modal show={show}>
        <Modal.Header closeButton onClick={close}>
            <Modal.Title>{header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={action}>
                Закрыть
            </Button>
        </Modal.Footer>
    </Modal>
    )
}
export default Profile;