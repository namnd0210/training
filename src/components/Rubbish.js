import React from "react";
import { useDrag } from "react-dnd";
import ItemTypes from "./ItemTypes";
const style = {
  position: "absolute",
  border: "1px dashed gray",
  backgroundColor: "white",
  padding: "0.5rem 1rem",
  cursor: "move"
};
const Rubbish = ({ item, id, left, top, hideSourceOnDrag }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { id, left, top, type: ItemTypes.ITEM },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} />;
  }
  return (
    <div ref={drag} style={{ ...style, left, top }}>
      <img src={require("../img/" + item.img)} alt={item.name} />
    </div>
  );
};
export default Rubbish;
