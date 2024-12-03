import { createContext, useMemo, useState } from "react";

export const OverviewContext = createContext();

function OverviewProvider({ children }) {
  const [shoppingLists, setShoppingLists] = useState([
    {
      id: "341785920",
      name: "Test",
      owner: "u1",
      memberList: ["u3"],
      itemList: [],
      status: "active",
    },
  ]);
  const [showArchived, setShowArchived] = useState(false);

  const handleCreate = (newList) => {
    setShoppingLists((current) => [
      ...current,
      { ...newList, status: "active" },
    ]);
    console.log("Updated shoppingLists:", shoppingLists);
  };

  const findShoppingList = (id) => {
    return shoppingLists.find((sl) => sl.id === id);
  };

  const handleArchive = (listId) => {
    setShoppingLists((current) => {
      const listToArchive = current.find((list) => list.id === listId);
      if (listToArchive) {
        listToArchive.status = "archived";
      }
      return [...current];
    });
  };

  const handleDelete = (listId) => {
    setShoppingLists((current) => current.filter((list) => list.id !== listId));
  };

  const filteredOV = useMemo(() => {
    return shoppingLists.filter((list) =>
      showArchived ? true : list.status === "active"
    );
  }, [showArchived, shoppingLists]);

  const updateShoppingList = (listId, updatedData) => {
    setShoppingLists((prevLists) => {
      return prevLists.map((list) =>
        list.id === listId ? { ...list, ...updatedData } : list
      );
    });
  };

  return (
    <OverviewContext.Provider
      value={{
        showArchived,
        setShowArchived,
        shoppingLists,
        filteredOV,
        handleCreate,
        handleArchive,
        handleDelete,
        findShoppingList,
        updateShoppingList,
      }}
    >
      {children}
    </OverviewContext.Provider>
  );
}
export default OverviewProvider;
