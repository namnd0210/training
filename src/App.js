import React from 'react';
import './App.css';
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import TodoList from "./components/TodoList";
import Dustbin from "./components/Dustbin";
import { todoList } from "./components/data";

function App() {

  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Dustbin greedy={true} />
        <TodoList todoList={todoList} />
      </DndProvider>
    </div>
  );
}

export default App;
