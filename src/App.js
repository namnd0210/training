import React, { useState } from 'react';
import './App.css';
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import TodoList from "./components/TodoList";
import Dustbin from "./components/Dustbin";
import _ from "lodash";



function App() {
  const [todoList, setTodoList] = useState([{
    "id": 1,
    "source": "list",
    "recipe": "",
    "name": "air",
    "img": "air.png",
    "isActive": true
  }, {
    "id": 2,
    "source": "list",
    "recipe": "",
    "name": "water",
    "img": "water.png",
    "isActive": true
  }, {
    "id": 3,
    "source": "list",
    "recipe": "",
    "name": "fire",
    "img": "fire.png",
    "isActive": true
  }, {
    "id": 4,
    "source": "list",
    "recipe": "",
    "name": "earth",
    "img": "earth.png",
    "isActive": true
  }, {
    "id": 5,
    "source": "list",
    "recipe": "air air",
    "name": "pressure",
    "img": "pressure.png",
    "isActive": false
  }, {
    "id": 6,
    "source": "list",
    "recipe": "water water",
    "name": "pubble",
    "img": "puddle.png",
    "isActive": false
  }, {
    "id": 7,
    "source": "list",
    "recipe": "pubble pubble",
    "name": "pond",
    "img": "pond.png",
    "isActive": false
  }])
  
  const active = (item) => {
    const index = _.findIndex(todoList, i=>i.name === item.name)
    setTodoList([
      ..._.slice(todoList, 0, index),
      { ...item, isActive: true },
      ..._.slice(todoList, index + 1)
    ])
  }
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Dustbin todoList={todoList} active={active} />
        <TodoList todoList={todoList} />
      </DndProvider>
    </div>
  );
}

export default App;
