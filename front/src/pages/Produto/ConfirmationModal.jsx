import React from 'react';
import Modal from 'react-modal';

import "./ConfirmationModal.css"

const ConfirmationModal = ({ isOpen, onConfirm, onClose, title, content }) => {
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} className="modal" overlayClassName="overlay">
            <h2 className="modal-title">{title}</h2>
            <p className="modal-text">{content}</p>
            <div className="modal-actions">
                <button className="modal-button" onClick={onConfirm}>
                    Confirmar
                </button>
                <button className="modal-button" onClick={onClose}>
                    Cancelar
                </button>
            </div>
        </Modal>
    );
};

export default ConfirmationModal;