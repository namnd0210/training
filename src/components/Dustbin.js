import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import ItemTypes from "./ItemTypes";
import Item from './Item';
import _ from 'lodash';
import "./Dustbin.css"


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
    setList(list.concat({ ...item, id: list.length, source: "dustbin" }))
  }

  const getCombineItem = (item1, item2) => {
    const index = _.findIndex(todoList, (item) =>
      (item1.name + " " + item2.name) === item.recipe
    )
    if (index !== -1 && item1.id !== item2.id) {
      return _.assign({ id: item1.id }, _.find(todoList, (item) =>
        (item1.name + " " + item2.name) === item.recipe)
      )
    }
    else return false
  }

  const combine = (item1, item2) => {
    const newItem = getCombineItem(item1, item2)
    if (newItem) {
      const index = _.indexOf(list, item1)
      let newList = [
        ..._.slice(list, 0, index),
        { ...newItem, source: "dustbin", isActive: true, type: ItemTypes.ITEM },
        ..._.slice(list, index + 1, list.length),
      ]

      if (item1.source === item2.source) {
        const index2 = _.findIndex(newList, { id: item2.id })
        newList = [
          ..._.slice(newList, 0, index2),
          ..._.slice(newList, index2 + 1, list.length),
        ]
      }

      setList([
        ...newList
      ])
      active(newItem)
    }
  }

  let backgroundColor = 'rgba(0, 0, 0, .5)'
  if (isOverCurrent || (isOver && greedy)) {
    backgroundColor = 'darkgreen'
  }

  return (
    <div ref={drop} className="workspace">
      {list.length !== 0 && list.map((item, index) =>
        <Item key={index} item={item} source="dustbin" id={list.length} combine={combine} />
      )}
      {hasDropped && console.log(list)}
      {hasDropped && setHasDropped(false)}
    </div>
  )
};

export default Dustbin;
