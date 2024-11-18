import React from "react";
import { Button } from "react-bootstrap";
import { IoRemoveCircleOutline } from "react-icons/io5";

function LeaveButton({ onLeave }) {
  return (
    <Button
      variant="danger"
      onClick={onLeave}
      className="mb-3"
      style={{
        borderRadius: "50%",
        width: "75px",
        height: "75px",
      }}
    >
      <IoRemoveCircleOutline size={50} />
    </Button>
  );
}

export default LeaveButton;
