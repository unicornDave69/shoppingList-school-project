import React, { useContext } from "react";
import { Modal, Button, Dropdown } from "react-bootstrap";
import { UserContext } from "../Providers/UserProvider";

function AddMembersModal({ show, handleClose, selectedMembers, onAddMember }) {
  const { userMap, loggedInUser } = useContext(UserContext);

  const handleSelect = (userId) => {
    if (!selectedMembers.includes(userId)) {
      onAddMember(userId);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Upravit členy seznamu</Modal.Title>
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
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Vyber člena
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {Object.entries(userMap).map(
              ([userId, user]) =>
                userId !== loggedInUser && (
                  <Dropdown.Item
                    key={userId}
                    onClick={() => handleSelect(userId)}
                    active={selectedMembers.includes(userId)}
                  >
                    {user.name}
                  </Dropdown.Item>
                )
            )}
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

export default AddMembersModal;
