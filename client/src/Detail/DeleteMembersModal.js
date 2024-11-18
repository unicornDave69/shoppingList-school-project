import React, { useContext } from "react";
import { Modal, Button, Dropdown } from "react-bootstrap";
import { UserContext } from "../Providers/UserProvider";

function DeleteMembersModal({
  show,
  handleClose,
  selectedMembers,
  onRemoveMember,
}) {
  const { userMap } = useContext(UserContext);

  const handleSelect = (userId) => {
    onRemoveMember(userId);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Odstranit členy seznamu</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Seznam členů:</p>
        <ul>
          {selectedMembers.map((userId) => (
            <li key={userId}>{userMap[userId]?.name || "Neznámý uživatel"}</li>
          ))}
        </ul>
        <hr />
        <Dropdown>
          <Dropdown.Toggle variant="danger" id="dropdown-delete-members">
            Vyber člena k odstranění
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {selectedMembers.map((userId) => (
              <Dropdown.Item key={userId} onClick={() => handleSelect(userId)}>
                {userMap[userId]?.name || "Neznámý uživatel"}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Zavřít
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteMembersModal;
