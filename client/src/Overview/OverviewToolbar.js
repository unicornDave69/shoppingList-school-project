import React, { useState, useContext, useRef, useEffect } from "react";
import { OverviewContext } from "../Providers/OverviewProvider";
import { UserContext } from "../Providers/UserProvider";
import { Container, Row, Col } from "react-bootstrap";
import WelcomeMessage from "./WelcomeMessage";
import IconButtons from "./IconButtons";
import CreateListModal from "./CreateListModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import ConfirmArchiveModal from "./ConfirmArchiveModal";
import ListCard from "./ListCard";
import DetailTable from "../Detail/DetailItemTable";

function Toolbar() {
  const {
    handleCreate,
    handleDelete,
    handleArchive,
    filteredOV,
    showArchived,
    setShowArchived,
  } = useContext(OverviewContext);
  const { loggedInUser, userMap } = useContext(UserContext);

  const [showModal, setShowModal] = useState(false);
  const [listName, setListName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [listToDelete, setListToDelete] = useState(null);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [listToArchive, setListToArchive] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [selectedList, setSelectedList] = useState(null);

  const colors = [
    "#F0F8FF",
    "#FAEBD7",
    "#F0FFFF",
    "#F5F5DC",
    "#FFEBCD",
    "#DEB887",
    "#D2691E",
    "#9ACD32",
    "#F5F5F5",
    "#F5DEB3",
    "#40E0D0",
    "#C0C0C0",
    "#F4A460",
    "#B0E0E6",
    "#FFA500",
  ];
  const listColorsRef = useRef({});

  const getColorForList = (listId) => {
    if (!listColorsRef.current[listId]) {
      listColorsRef.current[listId] =
        colors[Math.floor(Math.random() * colors.length)];
    }
    return listColorsRef.current[listId];
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleShowConfirmModal = (list) => {
    setListToDelete(list);
    setShowConfirmModal(true);
  };

  const handleCloseConfirmModal = () => setShowConfirmModal(false);

  // const confirmDelete = async () => {
  //   if (!listToDelete) return;

  //   try {
  //     const response = await fetch(
  //       `http://localhost:8000/api/lists/delete/${listToDelete.id}`,
  //       {
  //         method: "DELETE",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       const errorMessage = await response.text();
  //       throw new Error(`Failed to delete list: ${errorMessage}`);
  //     }

  //     const result = await response.json();
  //     console.log("Deleted list:", result);
  //     handleDelete(listToDelete.id);
  //   } catch (error) {
  //     console.error("Error deleting list:", error);
  //   } finally {
  //     handleCloseConfirmModal();
  //   }
  // };

  const handleShowArchiveModal = (list) => {
    setListToArchive(list);
    setShowArchiveModal(true);
  };

  const handleCloseArchiveModal = () => setShowArchiveModal(false);

  const confirmArchive = () => {
    if (listToArchive) {
      handleArchive(listToArchive.id);
    }
    handleCloseArchiveModal();
  };

  const handleSaveList = async () => {
    const newList = {
      name: listName,
      owner: loggedInUser,
      memberList: selectedMembers,
      itemList: [],
      status: "active",
    };

    try {
      const response = await fetch("http://localhost:8005/api/lists/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newList),
      });

      if (!response.ok) {
        throw new Error(`Failed to create list: ${response.statusText}`);
      }

      const result = await response.json();
      handleCreate(result.list);
    } catch (error) {
      console.error("Error creating list:", error);
    }

    setListName("");
    setSelectedMembers([]);
    handleCloseModal();
  };

  const showDetail = (list) => {
    setSelectedList(list);
    setShowTable(true);
  };

  useEffect(() => {
    console.log("Filtered lists:", filteredOV);
  }, [filteredOV]);

  return (
    <Container>
      <WelcomeMessage userName={userMap[loggedInUser]?.name} />
      <IconButtons
        handleShowModal={handleShowModal}
        setShowArchived={setShowArchived}
        showArchived={showArchived}
      />
      <CreateListModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        listName={listName}
        setListName={setListName}
        selectedMembers={selectedMembers}
        setSelectedMembers={setSelectedMembers}
        userMap={userMap}
        loggedInUser={loggedInUser}
        handleSaveList={handleSaveList}
      />
      <ConfirmDeleteModal
        showConfirmModal={showConfirmModal}
        handleCloseConfirmModal={handleCloseConfirmModal}
        listToDelete={listToDelete}
        // confirmDelete={confirmDelete}
      />
      <ConfirmArchiveModal
        showArchiveModal={showArchiveModal}
        handleCloseArchiveModal={handleCloseArchiveModal}
        listToArchive={listToArchive}
        confirmArchive={confirmArchive}
      />
      <Row className="mt-4">
        {filteredOV.map(
          (list, index) =>
            (list.memberList.includes(loggedInUser) ||
              list.owner === loggedInUser) && (
              <Col
                key={index}
                sm={6}
                md={4}
                lg={3}
                className="d-flex flex-column align-items-center"
              >
                <ListCard
                  list={list}
                  backgroundColor={getColorForList(list.id)}
                  handleShowConfirmModal={() => handleShowConfirmModal(list)}
                  handleShowArchiveModal={() => handleShowArchiveModal(list)}
                  isOwner={list.owner === loggedInUser}
                  showDetail={showDetail}
                />
              </Col>
            )
        )}
      </Row>
      {showTable && selectedList && <DetailTable list={selectedList} />}
    </Container>
  );
}

export default Toolbar;
