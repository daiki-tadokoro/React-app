import './App.css';
import axios from 'axios';
import { useState } from "react"
import {Todo} from "./Todo"
import { TodoType } from "./types/todo" 
import {Text} from "./Text"



function App() {
  const [todos, seTodos] = useState<Array<TodoType>>([]);
  const onClickFetchData = () => {
    axios.get<Array<TodoType>>("https://jsonplaceholder.typicode.com/todos").then((res) => {  
    seTodos(res.data)
    });
  };
  return (
    <div className="App">
      <Text color="red" fontSize="24px"/>
      <button onClick={onClickFetchData}>データを取得</button>
      {todos.map((todo) => (
        <Todo key={todo.id} title={todo.title} userId={todo.userId} completed={todo.completed} />
        ))}
    </div>
  );
}

export default App;
