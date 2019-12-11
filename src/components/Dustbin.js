import React, { useState } from "react";
import { useDrop } from "react-dnd";
import ItemTypes from "./ItemTypes";
import Item from './Item';
import _ from 'lodash';
import "./index.css";
import update from 'immutability-helper'


const Dustbin = ({ todoList, active }) => {
  const [list, setList] = useState([])
  const [hasDropped, setHasDropped] = useState(false)
  const [{ isOver, isOverCurrent }, drop] = useDrop({
    accept: ItemTypes.ITEM,
    drop(item, monitor) {
      if (item.source === "list") {
        const didDrop = monitor.didDrop()
        if (didDrop) {
          return
        }
        const delta = monitor.getClientOffset()
        const left = Math.round(delta.x)
        const top = Math.round(delta.y)
        addItemToList(item, left, top)
        setHasDropped(true)
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  })

  const [count, setCount] = useState(0);

  const addItemToList = (item, left, top) => {
    setList(list.concat({ ...item, id: count, source: "dustbin", left, top }))
    setCount(count+1)
  }

  const getCombineItem = (item1, item2) => {
    const index = _.findIndex(todoList, (item) =>
      (item1.name + " " + item2.name) === item.recipe
    )
    if (index !== -1 && item1.id !== item2.id) {
      return _.assign({}, _.find(todoList, (item) =>
        index === item.id-1)
      )
    }
    else return false
  }

  const combine = (item1, item2) => {
    const newItem = getCombineItem(item1, item2)
    if (newItem) {
      const index = _.indexOf(list, item1)
      console.log(index, newItem)
      let newList = [
        ..._.slice(list, 0, index),
        { ...newItem, id: item1.id, source: "dustbin", isActive: true, type: ItemTypes.ITEM, left: item1.left, top: item1.top },
        ..._.slice(list, index + 1),
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
  if (isOverCurrent || (isOver)) {
    backgroundColor = 'darkgreen'
  }

  return (
    <div ref={drop} className="workspace">
      {list.length !== 0 && list.map((item, index) =>
        {
          const {left, top} = item
          return <Item key={index} item={item} source="dustbin" combine={combine} left={left} top={top}/>
        }
      )}
      {hasDropped && console.log(list)}
      {hasDropped && setHasDropped(false)}
    </div>
  )
};

export default Dustbin;
