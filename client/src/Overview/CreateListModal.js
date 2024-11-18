import React from "react";
import { Modal, Button, Form, Dropdown } from "react-bootstrap";

function CreateListModal({
  showModal,
  handleCloseModal,
  listName,
  setListName,
  selectedMembers,
  setSelectedMembers,
  userMap,
  loggedInUser,
  handleSaveList,
}) {
  const handleSelect = (userId) => {
    setSelectedMembers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Create Shopping List</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formListName">
            <Form.Label>List Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter list name"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
            />
          </Form.Group>
          <hr />
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-members">
              Vyber členy
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
          <div className="mt-3">
            {selectedMembers.length > 0 && (
              <div>
                <strong>Členové:</strong>
                <ul>
                  {selectedMembers.map((userId) => (
                    <li key={userId}>{userMap[userId].name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveList}>
          Save List
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateListModal;
