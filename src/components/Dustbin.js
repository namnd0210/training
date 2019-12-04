import React, { useState } from "react";
import { useDrop } from "react-dnd";
import ItemTypes from "./ItemTypes";
import Item from './Item';

const getStyle = (backgroundColor) => ({
  height: "12rem",
  width: "60%",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  color: "white",
  padding: "1rem",
  textAlign: "center",
  fontSize: "1rem",
  lineHeight: "normal",
  float: "left",
  display: "flex",
  backgroundColor
})

const Dustbin = ({ greedy }) => {
  const [list, setList] = useState([])
  const [hasDropped, setHasDropped] = useState(false)
  const [{ isOver, isOverCurrent }, drop] = useDrop({
    accept: ItemTypes.ITEM,
    drop(item, monitor) {
      if (item.source === "list") {
        const didDrop = monitor.didDrop()
        if (didDrop && !greedy) {
          return
        }
        setList(list.concat({ ...item, source: "dustbin" }))
        setHasDropped(true)
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  })

  const combine = (item1, item2) => {
    if(item1 === item2) {
      const index = _.findIndex(list, item1)
      console.log(index)
    }
  }

  let backgroundColor = 'rgba(0, 0, 0, .5)'
  if (isOverCurrent || (isOver && greedy)) {
    backgroundColor = 'darkgreen'
  }
  return (
    <div ref={drop} style={getStyle(backgroundColor)}>

      {/* {hasDropped && console.log(list)} */}
      {list.length !== 0 && list.map((item, index) =>
        <Item key={index} item={item} source="dustbin" id={index} combine={combine} />
      )}
      {hasDropped && setHasDropped(false)}
    </div>
  )
};

export default Dustbin;
