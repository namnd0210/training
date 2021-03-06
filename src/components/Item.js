import React from "react";
import { useDrag, useDrop } from "react-dnd";
import ItemTypes from "./ItemTypes";
import "./index.css";

const Item = ({ item, source, combine, left, top }) => {
  const [{ isDragging, canDrag }, drag] = useDrag({
    item: { ...item, type: ItemTypes.ITEM },
    collect: (monitor) => (
      {
        isDragging: monitor.isDragging(),
        canDrag: monitor.canDrag()
      }
    )
  })

  const [{ dropItem }, drop] = useDrop({
    accept: ItemTypes.ITEM,
    drop(item, monitor) {
      if (
        (source === "list" && item.source === "list")
        || (source === "list" && item.source === "dustbin")
      )
        return
      combineItem()
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      dropItem: monitor.getItem(),
      isOver: monitor.isOver(),
    }),
  })

  const combineItem = () => {
    combine(item, dropItem)
  }

  let hideSourceOnDrag = source === "dustbin" ? true : false
  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} />
  }


  let refType = canDrag ? drag : drop

  return (
    <div className="item" style={{ left, top }}>
      <img
        ref={refType}
        src={require('../img/' + item.img)}
        alt={item.name}
      />
      {source !== "dustbin" && <div className="itemName">{item.name}</div>}
    </div>
  )
};
export default Item;
