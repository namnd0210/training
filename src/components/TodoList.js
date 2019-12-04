import React from "react";
import Item from "./Item";

function TodoList({ todoList }) {
  const style = {
    border: "1px dashed gray",
    backgroundColor: "white",
    padding: "0.5rem 1rem",
    marginRight: "1.5rem",
    marginBottom: "1.5rem",
    cursor: "move",
    maxWidth: "20%",
    float: "right",
    display: "flex",
    flexDirection: "column"
  };
  return (
    <div style={{ ...style }}>
      {
        todoList.map(
          (item, index) => (
            <Item item={item} key={index} source="list" id={index}/>
          )
        )
      }
    </div>
  );
}

export default TodoList;
