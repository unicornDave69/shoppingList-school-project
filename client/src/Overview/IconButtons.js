import React from "react";
import { CiCirclePlus } from "react-icons/ci";
import { IoIosArchive } from "react-icons/io";

function IconButtons({ handleShowModal, setShowArchived, showArchived }) {
  return (
    <div className="icons" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <CiCirclePlus onClick={handleShowModal} style={{ cursor: "pointer", color: "green", fontSize: "4em" }} />
      <IoIosArchive
        onClick={() => setShowArchived((prev) => !prev)}
        style={{
          cursor: "pointer",
          color: showArchived ? "black" : "grey",
          fontSize: "4em",
        }}
      />
    </div>
  );
}

export default IconButtons;
