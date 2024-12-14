import React from "react";
import DetailItemTable from "./DetailItemTable";
import { useParams } from "react-router-dom";

function Detail() {
  const { listId } = useParams();
  return (
    <>
      <DetailItemTable listId={listId} />
    </>
  );
}

export default Detail;
