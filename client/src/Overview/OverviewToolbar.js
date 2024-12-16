import React, { useState, useContext, useRef, useEffect } from "react";
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
  const { loggedInUser, userMap } = useContext(UserContext);

  const [shoppingLists, setShoppingLists] = useState([]);
  const [showArchived, setShowArchived] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [listName, setListName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [listToDelete, setListToDelete] = useState(null);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [listToArchive, setListToArchive] = useState(null);

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

  const handleShowArchiveModal = (list) => {
    setListToArchive(list);
    setShowArchiveModal(true);
  };

  const handleCloseConfirmModal = () => setShowConfirmModal(false);

  const confirmDelete = async (listToDeleteId) => {
    try {
      const response = await fetch(
        `http://localhost:8005/api/lists/delete/${listToDeleteId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to delete list: ${errorMessage}`);
      }

      setShoppingLists((prevLists) =>
        prevLists.filter((list) => list._id !== listToDeleteId)
      );
    } catch (error) {
      console.error("Error deleting list:", error);
    } finally {
      handleCloseConfirmModal();
    }
  };

  const handleCloseArchiveModal = () => setShowArchiveModal(false);

  const confirmArchive = async (listToArchiveId) => {
    try {
      const response = await fetch(
        `http://localhost:8005/api/lists/put/${listToArchiveId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "archived" }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to archive the list");
      }

      setShoppingLists((prevLists) =>
        prevLists.map((list) =>
          list._id === listToArchiveId ? { ...list, status: "archived" } : list
        )
      );
    } catch (error) {
      console.error("Error archiving list:", error);
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
      setShoppingLists((prevLists) => [...prevLists, result.list]);
    } catch (error) {
      console.error("Error creating list:", error);
    }

    setListName("");
    setSelectedMembers([]);
    handleCloseModal();
  };

  const fetchLists = async () => {
    try {
      const response = await fetch("http://localhost:8005/api/lists/list");
      if (!response.ok) {
        throw new Error("Failed to fetch lists");
      }
      const data = await response.json();
      setShoppingLists(data);
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  const filteredOV = shoppingLists.filter((list) =>
    showArchived ? true : list.status === "active"
  );

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
        confirmDelete={confirmDelete}
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
                  backgroundColor={getColorForList(list._id)}
                  handleShowConfirmModal={() => handleShowConfirmModal(list)}
                  handleShowArchiveModal={() => handleShowArchiveModal(list)}
                  isOwner={list.owner === loggedInUser}
                  onViewDetails={() => {
                    setSelectedList(list);
                    setShowTable(true);
                  }}
                />
              </Col>
            )
        )}
      </Row>
      {showTable && selectedList && (
        <DetailTable
          list={selectedList}
          onBackToOverview={() => {
            setShowTable(false);
            fetchLists();
          }}
        />
      )}
    </Container>
  );
}

export default Toolbar;
