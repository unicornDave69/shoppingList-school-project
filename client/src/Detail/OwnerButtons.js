import React from "react";
import { Button } from "react-bootstrap";
import { IoMdPersonAdd } from "react-icons/io";
import { FaUserAltSlash } from "react-icons/fa";
import { MdDriveFileRenameOutline } from "react-icons/md";

function OwnerButtons({ onAddMembers, onDeleteMembers, onEditName }) {
  return (
    <div className="d-flex mb-3">
      <Button
        variant="success"
        onClick={onAddMembers}
        className="me-2"
        style={{
          borderRadius: "50%",
          width: "75px",
          height: "75px",
        }}
      >
        <IoMdPersonAdd size={45} />
      </Button>
      <Button
        variant="danger"
        onClick={onDeleteMembers}
        className="me-2"
        style={{
          borderRadius: "50%",
          width: "75px",
          height: "75px",
        }}
      >
        <FaUserAltSlash size={45} />
      </Button>
      <Button
        variant="primary"
        onClick={onEditName}
        style={{
          borderRadius: "50%",
          width: "75px",
          height: "75px",
        }}
      >
        <MdDriveFileRenameOutline size={45} />
      </Button>
    </div>
  );
}

export default OwnerButtons;
