import React from "react";
import { Modal, Button } from "react-bootstrap";

function ConfirmDeleteModal({ showConfirmModal, handleCloseConfirmModal, listToDelete, confirmDelete }) {
  return (
    <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
      <Modal.Header closeButton>
        <Modal.Title>Potvrzení smazání</Modal.Title>
      </Modal.Header>
      <Modal.Body>Opravdu chcete smazat seznam "{listToDelete?.name}"?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseConfirmModal}>
          Zrušit
        </Button>
        <Button variant="danger" onClick={confirmDelete}>
          Smazat
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmDeleteModal;
