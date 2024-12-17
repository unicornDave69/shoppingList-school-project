import { createContext, useMemo, useState } from "react";

export const DetailContext = createContext();

function DetailProvider({ children }) {
  const [data, setData] = useState({
    id: "",
    name: "",
    owner: "",
    memberList: [],
    itemList: [],
  });

  const [showResolved, setShowResolved] = useState(false);

  const dataFilter = useMemo(() => {
    const filteredData = { ...data };
    if (!showResolved) {
      filteredData.itemList = filteredData.itemList.filter(
        (item) => !item.resolved
      );
    }
    return filteredData;
  }, [data, showResolved]);

  const setListDetails = (newData) => {
    setData(newData);
  };

  const value = {
    data: dataFilter,
    handlerMap: {
      addItem: ({ itemId, itemName, quantity }) => {
        setData((current) => ({
          ...current,
          itemList: [
            ...current.itemList,
            { itemId, itemName, quantity, resolved: false },
          ],
        }));
      },
      resolveItem: ({ itemId }) => {
        setData((current) => ({
          ...current,
          itemList: current.itemList.map((item) =>
            item.itemId === itemId
              ? { ...item, resolved: !item.resolved }
              : item
          ),
        }));
      },
      deleteItem: ({ itemId }) => {
        setData((current) => ({
          ...current,
          itemList: current.itemList.filter((item) => item.itemId !== itemId),
        }));
      },
      updateListName: ({ name }) => {
        setData((current) => ({ ...current, name }));
      },
      editMembers: ({ memberIds }) => {
        setData((prev) => ({ ...prev, memberList: memberIds }));
      },
    },
    showResolved,
    toggleShowResolved: () => setShowResolved((prev) => !prev),
    setListDetails,
  };

  return (
    <DetailContext.Provider value={value}>{children}</DetailContext.Provider>
  );
}

export default DetailProvider;
