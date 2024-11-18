import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ConfirmLeave({ show, onClose, onLeave }) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Chcete opustit seznam?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Pokud opustíte seznam, nebudete mít přístup k jeho detailům.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Zrušit
        </Button>
        <Button variant="danger" onClick={onLeave}>
          Opustit seznam
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmLeave;
