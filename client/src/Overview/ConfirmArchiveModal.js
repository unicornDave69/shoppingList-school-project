import React from "react";
import { Modal, Button } from "react-bootstrap";

function ConfirmArchiveModal({ showArchiveModal, handleCloseArchiveModal, listToArchive, confirmArchive }) {
  return (
    <Modal show={showArchiveModal} onHide={handleCloseArchiveModal}>
      <Modal.Header closeButton>
        <Modal.Title>Potvrzení archivace</Modal.Title>
      </Modal.Header>
      <Modal.Body>Opravdu chcete archivovat seznam "{listToArchive?.name}"?</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleCloseArchiveModal}>
          Zrušit
        </Button>
        <Button variant="secondary" onClick={confirmArchive}>
          Archivovat
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmArchiveModal;
