import React from "react";
import ReactModal from "react-modal";

function Modal(props) {
    return (
        <ReactModal
            isOpen={props.modalIsOpen}
            onRequestClose={props.closeModal}
            className="modal">
        </ReactModal>
    );
}

export default Modal;