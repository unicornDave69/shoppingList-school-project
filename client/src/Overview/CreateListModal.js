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

  const handleSaveToDatabase = async () => {
    const now = new Date();
    const dataToSend = {
      name: listName,
      owner: loggedInUser,
      memberList: selectedMembers,
      itemList: [],
      status: "active",
    };

    try {
      const response = await fetch("http://localhost:8000/lists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error("Failed to save list to database.");
      }

      const newList = await response.json();
      console.log("List saved to database:", newList);
      handleCloseModal();
    } catch (error) {
      console.error("Error saving list to database:", error);
    }
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
        <Button variant="primary" onClick={handleSaveToDatabase}>
          Save List
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateListModal;
