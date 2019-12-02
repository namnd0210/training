import React, { useState } from "react";
import { useDrop } from "react-dnd";
import ItemTypes from "./ItemTypes";
import update from 'immutability-helper'
import Rubbish from "./Rubbish";
// import { list } from './data';

const style = {
  width: "70%",
  height: "300px",
  float: "left",
  border: '1px solid black',
  position: "relative"
}

const Dustbin = ({ hideSourceOnDrag }) => {
  const [items, setItems] = useState([]);
  const [, drop] = useDrop({
    accept: ItemTypes.ITEM,
    drop(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);
      setItems(items.concat({...item, id:items.id, left, top}))
      moveItem(items.id, left, top);
      return undefined;
    }
  });
  const moveItem = (id, left, top, ...item) => {
    setItems(
      update(items, {
        [id]: {
          $merge: { left, top, item }
        }
      })
    );
  };
  return (
    <div ref={drop} style={style}>
      {items.map((item, index) => {
        const { left, top } = item;
        return (
          <Rubbish
            key={index}
            item={item}
            id={index}
            left={left}
            top={top}
            hideSourceOnDrag={hideSourceOnDrag}
          >
            
          </Rubbish>
        );
      })}
    </div>
  );
};

export default Dustbin;
