import React from "react";
import Modal from "react-bootstrap/Modal";
import icon from "../gambar/modal-information-icon.svg";

const  AlertModal = ({show, hide, type}) => {
    return(
        <Modal show={show} onHide={hide} centered data-cy='modal-informasi'>
            <Modal.Body>
                <img src={icon} alt="info" className="me-3" data-cy="modal-informasi-icon"></img>
                <span data-cy='modal-information-title'>{type} berhasil dihapus</span>
            </Modal.Body>
        </Modal>
    );
};

export default AlertModal;