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
  const { handlerMap, toggleShowResolved } = useContext(DetailContext);
  const { updateShoppingList } = useContext(OverviewContext);
  const { loggedInUser } = useContext(UserContext);

  const [localShoppingList, setLocalShoppingList] = useState(null);
  const [showAddMembersModal, setShowAddMembersModal] = useState(false);
  const [showConfirmLeaveModal, setShowConfirmLeaveModal] = useState(false);
  const [showDeleteMembersModal, setShowDeleteMembersModal] = useState(false);
  const [showListNameModal, setShowListNameModal] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState(null);

  const navigate = useNavigate();
  const { listId } = useParams();

  useEffect(() => {
    const fetchListDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8005/api/lists/get/${listId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch list details");
        }
        const fetchedData = await response.json();

        if (fetchedData.name !== localShoppingList?.name) {
          setLocalShoppingList(fetchedData);
        }

        handlerMap.setListDetails(fetchedData);
      } catch (error) {
        console.error("Error fetching list details:", error);
      }
    };

    fetchListDetails();
  }, [listId, handlerMap, localShoppingList?.name]); // Závislosti, včetně názvu seznamu

  if (!localShoppingList) {
    return <h1>Seznam nebyl nalezen.</h1>;
  }

  const isOwner = localShoppingList.owner === loggedInUser;

  const handleRemoveMember = (memberId) => {
    setMemberToRemove(memberId);
    setShowConfirmLeaveModal(true);
  };

  const handleConfirmLeave = () => {
    const updatedMembers = localShoppingList.memberList.filter(
      (member) => member !== memberToRemove
    );
    const updatedList = { ...localShoppingList, memberList: updatedMembers };
    setLocalShoppingList(updatedList);
    updateShoppingList(listId, updatedList);
    setShowConfirmLeaveModal(false);

    if (memberToRemove === loggedInUser) {
      navigate("/");
    }
  };

  // const handleAddMember = (newMemberId) => {
  //   const updatedMembers = [...localShoppingList.memberList, newMemberId];
  //   const updatedList = { ...localShoppingList, memberList: updatedMembers };
  //   setLocalShoppingList(updatedList);
  //   updateShoppingList(listId, updatedList);
  // };

  const handleDeleteMembers = (membersToRemove) => {
    const updatedMembers = localShoppingList.memberList.filter(
      (member) => !membersToRemove.includes(member)
    );
    const updatedList = { ...localShoppingList, memberList: updatedMembers };
    setLocalShoppingList(updatedList);
    updateShoppingList(listId, updatedList);
    setShowDeleteMembersModal(false);
  };

  const handleAddMember = (newMemberId) => {
    const updatedMembers = [...localShoppingList.memberList, newMemberId];
    const updatedList = { ...localShoppingList, memberList: updatedMembers };
    setLocalShoppingList(updatedList);

    try {
      const response = fetch(`http://localhost:8005/api/lists/put/${listId}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updatedList),
      });

      if (!response.ok) {
        throw new Error("Failed to update the member list on the server.");
      }
      handlerMap.addMembersBulk(updatedMembers);
    } catch (error) {
      console.error("Error updating memberList:", error);
    }

    setShowAddMembersModal(false);
  };

  const handleUpdateListName = async (newName) => {
    const updatedList = { ...localShoppingList, name: newName };
    setLocalShoppingList(updatedList);

    // PUT request to update the list name on the server
    try {
      const response = await fetch(
        `http://localhost:8005/api/lists/put/${listId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedList),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update the list name on the server.");
      }

      // Update state in the provider if the request is successful
      handlerMap.updateListName({ name: newName });
    } catch (error) {
      console.error("Error updating list name:", error);
    }

    setShowListNameModal(false);
  };
  return (
    <>
      <BackToOverview />
      <div className="text-center my-4">
        <h1>{localShoppingList.name}</h1>
      </div>
      <ItemTable items={localShoppingList.itemList} />
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

        {isOwner ? (
          <OwnerButtons
            onAddMembers={() => setShowAddMembersModal(true)}
            onDeleteMembers={() => setShowDeleteMembersModal(true)}
            onEditName={() => setShowListNameModal(true)}
          />
        ) : (
          <LeaveButton onLeave={() => handleRemoveMember(loggedInUser)} />
        )}

        <Button
          variant="info"
          className="d-flex align-items-center justify-content-center"
          onClick={toggleShowResolved}
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
        selectedMembers={localShoppingList.memberList}
        onAddMember={handleAddMember}
      />
      <DeleteMembersModal
        show={showDeleteMembersModal}
        handleClose={() => setShowDeleteMembersModal(false)}
        selectedMembers={localShoppingList.memberList}
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
        currentName={localShoppingList.name}
        onUpdateName={handleUpdateListName}
      />
    </>
  );
}

export default DetailItemTable;
