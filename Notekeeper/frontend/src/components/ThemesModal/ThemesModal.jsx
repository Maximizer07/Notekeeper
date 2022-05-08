import React from "react";
import Modal from "../Modal/Modal";

function ThemesModal(props) {
    const themes = [1, 2, 3, 4, 5]
    return (
        <Modal modalIsOpen={props.isOpen} closeModal={props.toggleThemesModal}>
            {
                <div className="themes-modal">
                    <h1 className="themes-title">Themes</h1>
                </div>
            }
        </Modal>
    );
}

export default ThemesModal;