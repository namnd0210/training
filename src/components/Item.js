import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import ItemTypes from "./ItemTypes";

const Item = ({ item, source, id, combine }) => {
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
    {
      item: { type: ItemTypes.ITEM, source, id, ...item },
    }
  )

  const [hasDropped, setHasDropped] = useState(false)
  const [{ dropItem, isOver, isOverCurrent }, drop] = useDrop({
    accept: ItemTypes.ITEM,
    drop(item, monitor) {
      combineItem()
      setHasDropped(true)
    },

    collect: (monitor) => ({
      dropItem: monitor.getItem(),
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  })

  const combineItem = () => {
    combine(item, dropItem)

    // { hasDropped && console.log(item, dropItem) }
  }

  let backgroundColor = 'rgba(0, 0, 0, .5)'
  if (isOverCurrent || (isOver)) {
    backgroundColor = 'darkgreen'
  }
  let refType = source === "list" ? drag : drop
  return (
    <div>
      <div ref={refType} style={getStyle(backgroundColor)}>
        <img src={require('../img/' + item.img)} />
      </div>
    </div>
  )
};
export default Item;
