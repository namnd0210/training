import React, { useState } from "react";
import { useDrop } from "react-dnd";
import ItemTypes from "./ItemTypes";
import Item from './Item';
import _ from 'lodash';
import "./index.css";


const Dustbin = ({ todoList, active }) => {
  const [list, setList] = useState([])
  const [hasDropped, setHasDropped] = useState(false)
  const [, drop] = useDrop({
    accept: ItemTypes.ITEM,
    drop(item, monitor) {
      const didDrop = monitor.didDrop()
      if (didDrop) {
        return
      }
      const delta = monitor.getClientOffset()
      const left = Math.round(delta.x - 35)
      const top = Math.round(delta.y - 35)
      if (item.source === "dustbin") {
        moveItem(item, left, top)
        return
      }
      addItemToList(item, left, top)
      setHasDropped(true)
    },

  })

  const [count, setCount] = useState(0);

  const addItemToList = (item, left, top) => {
    setList(list.concat({ ...item, id: count, source: "dustbin", left, top }))
    setCount(count + 1)
  }

  const moveItem = (item, left, top) => {
    const index = _.findIndex(list, { id: item.id })
    setList(
      [
        ..._.slice(list, 0, index),
        { ...item, left, top },
        ..._.slice(list, index + 1),
      ]
    );
  };

  const getCombineItem = (item1, item2) => {
    const index = _.findIndex(todoList, (item) =>
      (item1.name + " " + item2.name) === item.recipe
    )
    if (index !== -1) {
      return _.assign({}, _.find(todoList, (item) =>
        index === item.id - 1
      ))
    }
    else return false
  }

  const combine = (item1, item2) => {
    const newItem = getCombineItem(item1, item2)
    if (newItem) {
      const index = _.indexOf(list, item1)
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

  return (
    <div ref={drop} className="workspace">
      {list.length !== 0 && list.map((item, index) => {
        const { left, top } = item
        return <Item key={index} item={item} source="dustbin" combine={combine} left={left} top={top} />
      }
      )}
      {hasDropped && console.log(list)}
      {hasDropped && setHasDropped(false)}
    </div>
  )
};

export default Dustbin;
