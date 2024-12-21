import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function ConfirmArchiveModal({
  showArchiveModal,
  handleCloseArchiveModal,
  listToArchive,
  confirmArchive,
}) {
  const { t } = useTranslation();

  return (
    <Modal show={showArchiveModal} onHide={handleCloseArchiveModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t("confirm_archive_title")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t("confirm_archive_body", { name: listToArchive?.name })}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleCloseArchiveModal}>
          {t("cancel")}
        </Button>
        <Button
          variant="secondary"
          onClick={() => confirmArchive(listToArchive._id)}
        >
          {t("archive")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmArchiveModal;
