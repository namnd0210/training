import React, { useState, useRef } from "react";
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

  const ref = useRef(null)
  const [, drag] = useDrag({
    item: { ...item, type: ItemTypes.ITEM }
  })

  const [hasDropped, setHasDropped] = useState(false)
  const [{ dropItem, isOver, isOverCurrent }, drop] = useDrop({
    accept: ItemTypes.ITEM,
    drop(item, monitor) {
      combineItem()
      setHasDropped(true)
    },
    collect: (monitor) => ({
      // beginDrag: monitor.begin(),  
      dropItem: monitor.getItem(),
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  })

  const combineItem = () => {
    combine(item, dropItem)
  }

  let backgroundColor = 'rgba(0, 0, 0, .5)'
  if (isOverCurrent || (isOver)) {
    backgroundColor = 'darkgreen'
  }

  // let refType;
  // if (source === "list") refType = drag
  // else if (source === "dustbin" && dropItem.source === "dustbin") refType = drop;
  // else if (source === "dustbin") refType = drop

  let refType = source === "list" ? drag : drop

  return (
    <div ref={refType} style={getStyle(backgroundColor)}>
      <img src={require('../img/' + item.img)} />

      {/* {hasDropped && console.log(item, dropItem)} */}
    </div>
  )
};
export default Item;
