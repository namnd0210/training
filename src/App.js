import React, {useState, useCallback} from 'react';
import './App.css';
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import TodoList from "./components/TodoList";
import Dustbin from "./components/Dustbin";
import { todoList } from "./components/data";

function App() {
  const [hideSourceOnDrag, setHideSourceOnDrag] = useState(true)
  // const toggle = useCallback(() => setHideSourceOnDrag(!hideSourceOnDrag), [
  //   hideSourceOnDrag,
  // ])
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Dustbin hideSourceOnDrag={hideSourceOnDrag} />
        <TodoList todoList={todoList} />
      </DndProvider>
    </div>
  );
}

export default App;
