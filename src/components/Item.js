import React from "react";
import { useDrag } from "react-dnd";
import ItemTypes from "./ItemTypes";

const Item = ({ item }) => {
  const style = {
    border: "1px dashed gray",
    backgroundColor: "white",
    padding: "0.5rem 1rem",
    width: "64px",
    marginBottom: "10px",
    cursor: "move"
  };
  const [, drag] = useDrag(
    {
      item: { type: ItemTypes.ITEM, ...item }
    }
  )

  return (
    <div ref={drag} style={style}>
      <img src={require("../img/" + item.img)} alt={item.name} />
    </div>
  )
};
export default Item;
