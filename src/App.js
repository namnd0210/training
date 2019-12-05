import React, {useState} from 'react';
import './App.css';
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import TodoList from "./components/TodoList";
import Dustbin from "./components/Dustbin";

var todoList = 
  [{
    "recipe": "",
    "name": "air",
    "img": "air.png",
    "isActive": true
  }, {
    "recipe": "",
    "name": "water",
    "img": "water.png",
    "isActive": true
  }, {
    "recipe": "",
    "name": "fire",
    "img": "fire.png",
    "isActive": true
  }, {
    "recipe": "",
    "name": "earth",
    "img": "earth.png",
    "isActive": true
  }, {
    "recipe": "air air",
    "name": "pressure",
    "img": "pressure.png",
    "isActive": false
  }, {
    "recipe": "water water",
    "name": "pubble",
    "img": "puddle.png",
    "isActive": false
  }]

function App() {
  const [hideSourceOnDrag, setHideSourceOnDrag] = useState(true)
  // const toggle = useCallback(() => setHideSourceOnDrag(!hideSourceOnDrag), [
  //   hideSourceOnDrag,
  // ])
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Dustbin hideSourceOnDrag={hideSourceOnDrag} todoList={todoList} />
        <TodoList todoList={todoList} />
      </DndProvider>
    </div>
  );
}

export default App;
