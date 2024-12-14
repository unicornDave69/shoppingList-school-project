import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { IoIosArchive } from "react-icons/io";
import { TbListDetails } from "react-icons/tb";

function ListCard({
  list,
  backgroundColor,
  handleShowConfirmModal,
  handleShowArchiveModal,
  isOwner,
  findShoppingList,
  handleCloseConfirmModal,
}) {
  const handleDetailNavigation = async (listId) => {
    try {
      const response = await fetch(
        `http://localhost:8005/api/lists/get/${listId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to get list: ${errorMessage}`);
      }

      const result = await response.json();
      console.log("Geted list:", result);
      findShoppingList(list.id);
    } catch (error) {
      console.error("Error finding list:", error);
    } finally {
      handleCloseConfirmModal();
    }
  };

  return (
    <>
      <Card
        className="cards"
        style={{
          borderRadius: "50%",
          width: "250px",
          height: "250px",
          textAlign: "center",
          backgroundColor: backgroundColor,
          margin: "10px",
        }}
      >
        <Card.Body>
          <Card.Title
            style={{
              fontSize: "2.3em",
              margin: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            {list.name}
          </Card.Title>
        </Card.Body>
      </Card>

      <div
        className="below buttons"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "5px",
        }}
      >
        {isOwner && (
          <>
            <Button
              variant="danger"
              onClick={handleShowConfirmModal}
              style={{
                borderRadius: "50%",
                width: "75px",
                height: "75px",
                margin: "5px",
              }}
            >
              <FaTrash size={50} />
            </Button>
            <Button
              variant="secondary"
              onClick={handleShowArchiveModal}
              style={{
                borderRadius: "50%",
                width: "75px",
                height: "75px",
                margin: "5px",
              }}
            >
              <IoIosArchive size={50} />
            </Button>
          </>
        )}
        <Button
          variant="primary"
          onClick={() => handleDetailNavigation(list.id)}
          style={{
            borderRadius: "50%",
            width: "75px",
            height: "75px",
            margin: "5px",
          }}
        >
          <TbListDetails size={50} />
        </Button>
      </div>
    </>
  );
}

export default ListCard;
