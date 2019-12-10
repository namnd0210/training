import React from "react";
import Item from "./Item";
import "./TodoList.css";

function TodoList({ todoList }) {
  return (
    <div className="todoList">
      {
        todoList.map(
          (item, index) => 
            item.isActive&&<Item item={item} key={index} source="list"/>
        )
      }
      {/* {console.log(todoList)} */}
    </div>
  );
}

export default TodoList;
