import React from "react";
import DetailItemTable from "./DetailItemTable";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams(); // id is the correct variable name based on the URL parameter

  return (
    <>
      <DetailItemTable listId={id} />{" "}
      {/* Pass id to DetailItemTable as listId */}
    </>
  );
}

export default Detail;
