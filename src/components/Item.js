import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import ItemTypes from "./ItemTypes";

const Item = ({ item, source, id }) => {
  const getStyle = (backgroundColor) => ({
    border: "1px dashed gray",
    backgroundColor,
    padding: "0.5rem 1rem",
    marginRight: "10px",
    marginBottom: "10px",
    cursor: "move",
    width: "64px",
    height: "64px"
  });
  const [, drag] = useDrag(
    { item: { type: ItemTypes.ITEM, name: item.name, img: item.img, source, id } }
  )

  const [hasDropped, setHasDropped] = useState(false)
  const [{ isOver, isOverCurrent }, drop] = useDrop({
    accept: ItemTypes.ITEM,
    drop() {
      setHasDropped(true)
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  })

  let backgroundColor = 'rgba(0, 0, 0, .5)'
  if (isOverCurrent || (isOver)) {
    backgroundColor = 'darkgreen'
  }
  let refType = id === "drag" ? drag : drop
  return (
    <div ref={refType} style={getStyle(backgroundColor)}>
      <img src={require('../img/' + item.img)} />
    </div>
  )
};
export default Item;
