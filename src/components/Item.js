import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import ItemTypes from "./ItemTypes";
import "./Item.css";

const Item = ({ item, source, id, combine }) => {
  const [{canDrag}, drag] = useDrag({
    item: { ...item, type: ItemTypes.ITEM },
    collect: (monitor) => (
      {
        canDrag: monitor.canDrag()
      }
    )
  })

  const [hasDropped, setHasDropped] = useState(false)
  const [{ dropItem}, drop] = useDrop({
    accept: ItemTypes.ITEM,
    drop(item, monitor) {
      combineItem()
      setHasDropped(true)
    },
    collect: (monitor) => ({
      dropItem: monitor.getItem(),
    }),
  })

  const combineItem = () => {
    combine(item, dropItem)
  }

  let refType = canDrag? drag : drop

  return (
    <div className="item">
      <img
        ref={refType}
        src={require('../img/' + item.img)}
        alt={item.name}
      />
      {source!=="dustbin"&&<div className="itemName">{item.name}</div>}
    </div>
  )
};
export default Item;
