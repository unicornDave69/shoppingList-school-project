import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { MdDone } from "react-icons/md";

import { DetailContext } from "../Providers/DetailProvider";
import { OverviewContext } from "../Providers/OverviewProvider";
import { UserContext } from "../Providers/UserProvider";

import BackToOverview from "./BackToOverviewButton";
import ConfirmLeave from "./ConfirmLeaveListModal";
import AddMembersModal from "./AddMembersModal";
import DeleteMembersModal from "./DeleteMembersModal";
import ListNameModal from "./EditListNameModal";
import ItemTable from "./ItemTable";
import AddItemButton from "./AddItemButton";
import OwnerButtons from "./OwnerButtons";
import LeaveButton from "./LeaveButton";

function DetailItemTable() {
  const { data, handlerMap, toggleShowResolved, setListDetails } =
    useContext(DetailContext);
  const { findShoppingList, updateShoppingList } = useContext(OverviewContext);
  const { loggedInUser } = useContext(UserContext);

  const [showAddMembersModal, setShowAddMembersModal] = useState(false);
  const [showConfirmLeaveModal, setShowConfirmLeaveModal] = useState(false);
  const [showDeleteMembersModal, setShowDeleteMembersModal] = useState(false);
  const [showListNameModal, setShowListNameModal] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState(null);

  const navigate = useNavigate();
  const { listId } = useParams();

  const shoppingList = findShoppingList(listId);

  if (!shoppingList) {
    return <h1>Seznam nebyl nalezen.</h1>;
  }

  const isOwner = shoppingList.owner === loggedInUser;

  const handleRemoveMember = (memberId) => {
    setMemberToRemove(memberId);
    setShowConfirmLeaveModal(true);
  };

  const handleConfirmLeave = () => {
    const updatedMembers = shoppingList.memberList.filter(
      (member) => member !== memberToRemove
    );
    updateShoppingList(listId, { ...shoppingList, memberList: updatedMembers });
    setShowConfirmLeaveModal(false);

    if (memberToRemove === loggedInUser) {
      navigate("/");
    }
  };

  const handleAddMember = (newMemberId) => {
    const updatedMembers = [...shoppingList.memberList, newMemberId];
    updateShoppingList(listId, { ...shoppingList, memberList: updatedMembers });
  };

  const handleDeleteMembers = (membersToRemove) => {
    const updatedMembers = shoppingList.memberList.filter(
      (member) => !membersToRemove.includes(member)
    );
    updateShoppingList(listId, { ...shoppingList, memberList: updatedMembers });
    setShowDeleteMembersModal(false);
  };

  const handleUpdateListName = (newName) => {
    updateShoppingList(listId, { ...shoppingList, name: newName });
    setShowListNameModal(false);
  };

  return (
    <>
      <BackToOverview />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <h1>{shoppingList.name}</h1>
      </div>
      <ItemTable items={data.itemList} />
      <div
        className="button-container d-flex justify-content-center align-items-center"
        style={{
          position: "fixed",
          bottom: "30px",
          width: "100%",
          gap: "10px",
          zIndex: 1000,
        }}
      >
        <AddItemButton onClick={() => handlerMap.addItem({})} />

        {isOwner && (
          <OwnerButtons
            onAddMembers={() => setShowAddMembersModal(true)}
            onDeleteMembers={() => setShowDeleteMembersModal(true)}
            onEditName={() => setShowListNameModal(true)}
          />
        )}

        {!isOwner && (
          <LeaveButton onLeave={() => handleRemoveMember(loggedInUser)} />
        )}

        <Button
          variant="info"
          className="d-flex align-items-center justify-content-center"
          onClick={() => toggleShowResolved()}
          style={{
            borderRadius: "50%",
            width: "75px",
            height: "75px",
            color: "white",
          }}
        >
          <MdDone size={50} />
        </Button>
      </div>

      <AddMembersModal
        show={showAddMembersModal}
        handleClose={() => setShowAddMembersModal(false)}
        selectedMembers={shoppingList.memberList}
        onAddMember={handleAddMember}
      />
      <DeleteMembersModal
        show={showDeleteMembersModal}
        handleClose={() => setShowDeleteMembersModal(false)}
        selectedMembers={shoppingList.memberList}
        onRemoveMember={handleDeleteMembers}
      />
      <ConfirmLeave
        show={showConfirmLeaveModal}
        onClose={() => setShowConfirmLeaveModal(false)}
        onLeave={handleConfirmLeave}
      />
      <ListNameModal
        show={showListNameModal}
        handleClose={() => setShowListNameModal(false)}
        currentName={shoppingList.name}
        onUpdateName={handleUpdateListName}
      />
    </>
  );
}

export default DetailItemTable;
