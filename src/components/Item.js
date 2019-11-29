import React from "react";
import { useDrag } from "react-dnd";
import ItemTypes from "./ItemTypes";

const Item = ({ name }) => {
  const style = {
    border: "1px dashed gray",
    backgroundColor: "white",
    padding: "0.5rem 1rem",
    marginRight: "1.5rem",
    marginBottom: "1.5rem",
    cursor: "move"
  };
  const [, drag] = useDrag({ item: { type: ItemTypes.ITEM } })
  return (
    <div ref={drag} style={style}>
      {name}
    </div>
  )
};
export default Item;
