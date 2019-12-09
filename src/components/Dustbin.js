import React, { useState } from "react";
import { useDrop } from "react-dnd";
import ItemTypes from "./ItemTypes";
import Item from './Item';
import _ from 'lodash';

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

const Dustbin = ({ greedy, todoList, active }) => {
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
        addItemToList(item)
        setHasDropped(true)
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  })

  const addItemToList = item => {
    setList(list.concat({ ...item, id: list.length + 1, source: "dustbin" }))
  }

  const getCombineItem = (item1, item2) => {
    const index = _.findIndex(todoList, (item) =>
      (item1.name + " " + item2.name) === item.recipe
    )
    if (index !== -1) {
      return _.assign({id: item1.id}, _.find(todoList, (item) =>
        (item1.name + " " + item2.name) === item.recipe)
      )
    }
    else return false
  }

  const combine = (item1, item2) => {
    const newItem = getCombineItem(item1, item2)
    if (newItem) {
      const indexOflist = _.indexOf(list, item1)
      setList(
        [
          ..._.slice(list, 0, indexOflist),
          { ...newItem, source: "dustbin", isActive: true, type: ItemTypes.ITEM },
          ..._.slice(list, indexOflist + 1, list.length)
        ]
      )
      active(newItem)
    }
    // else console.log("-2")
  }

  let backgroundColor = 'rgba(0, 0, 0, .5)'
  if (isOverCurrent || (isOver && greedy)) {
    backgroundColor = 'darkgreen'
  }
  return (
    <div ref={drop} style={getStyle(backgroundColor)}>

      {/* {hasDropped && console.log(list)} */}
      {list.length !== 0 && list.map((item, index) =>
        <Item key={index} item={item} source="dustbin" id={list.length + 1} combine={combine} />
      )}
      {/* {hasDropped&&console.log(list)} */}
      {hasDropped && setHasDropped(false)}
    </div>
  )
};

export default Dustbin;
