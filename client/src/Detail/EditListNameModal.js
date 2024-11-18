import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function ListNameModal({ show, handleClose, currentName, onUpdateName }) {
  const [newName, setNewName] = useState(currentName);

  const handleSave = () => {
    if (newName.trim()) {
      onUpdateName(newName);
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Změnit název seznamu</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formListName">
            <Form.Label>Nový název seznamu</Form.Label>
            <Form.Control
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Zadejte nový název"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Zavřít
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Uložit změny
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ListNameModal;
