import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { IoIosArchive } from "react-icons/io";
import { TbListDetails } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

function ListCard({
  list,
  backgroundColor,
  handleShowConfirmModal,
  handleShowArchiveModal,
  isOwner,
}) {
  const navigate = useNavigate();

  const handleDetailNavigation = async () => {
    try {
      const response = await fetch(
        `http://localhost:8005/api/lists/get/${list.id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch list details");
      }
      const data = await response.json();
      navigate(`/list/${list.id}`, { state: { listDetails: data } });
    } catch (error) {
      console.error("Error fetching list details:", error);
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
          onClick={handleDetailNavigation}
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
