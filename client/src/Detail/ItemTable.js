import React from "react";
import { Table } from "react-bootstrap";
import ResolveItemButton from "./ResolveItemButton";
import DeleteItemButton from "./DeleteItemButton";

function ItemTable({ items }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Název</th>
          <th>Množství</th>
          <th>Akce</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.itemId}>
            <td>{item.itemName}</td>
            <td>{item.quantity}</td>
            <td>
              <ResolveItemButton itemId={item.itemId} />
            </td>
            <td>
              <DeleteItemButton itemId={item.itemId} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ItemTable;
